const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const Op = require("sequelize").Op;
const PDFDocument = require("pdfkit");
const { Upload, Action } = require("../db").db.models;
const { isLoggedIn, isAdmin } = require("./auth");

const getUglyDate = () => {
  let now = new Date();
  let obj = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
  if (obj.month.toString().length === 1) obj.month = `0${obj.month}`;
  if (obj.day.toString().length === 1) obj.day = `0${obj.day}`;
  return `${obj.month}-${obj.day}-${obj.year}`;
};

const checkFor$ = (num) => {
  if (typeof num === "string") {
    let str = num.split("");
    str = str
      .filter((char) => {
        return char !== "$" && char !== ",";
      })
      .join("");
    return Number(str);
  } else return num;
};

const sum = (...targs) => {
  let val = 0;
  targs.forEach((n) => (val += checkFor$(n) || 0));
  return monify(val);
};

const product = (...targs) => {
  let val = 0;
  targs.forEach((n, index) => {
    if (index === 0) val = checkFor$(n) || 0;
    else val *= checkFor$(n) || 0;
  });
  return String(val);
};

const round = (n) => {
  return monify(Math.round(checkFor$(n) * 100) / 100);
};

const monify = (n, fallback) => {
  if (!n && fallback) return fallback;
  let str = String(n);
  let arr = str.split(".");
  arr[0] = arr[0].split("");
  arr[0] = arr[0]
    .map((char, index) => {
      return index !== arr[0].length - 1 && (arr[0].length - index) % 3 === 1
        ? char + ","
        : char;
    })
    .join("");
  if (arr.length === 1) arr.push("00");
  else if (arr[1].length === 1) arr[1] += "0";
  else if (arr[1].length === 0) arr[1] = "00";
  return arr.join(".");
};

// more powerful version of checkFor$
const isThisEquivalentToANumber = (str) => {
  if (typeof str !== "string") return false;
  let digitValues = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  let digits = str.split("").filter((char) => {
    return digitValues[char];
  });
  return digits.length > 0 ? true : false;
};

module.exports = require("express")
  .Router()

  .post("/new", isLoggedIn, isAdmin, (req, res) => {
    Upload.create({ buyoutId: req.body.values.id }, { returning: true })
      .then((newUpload) => {
        const filePath = path.resolve(__dirname, `../uploads/${newUpload.id}`);
        fs.mkdirSync(filePath);
        const values = req.body.values;
        const workbook = values.leases[values.calcTarget].workbook;
        const machines = values.leases[values.calcTarget].machines.filter(
          (machine) => !machine.delete
        );
        const customer = req.body.version === "customer" ? true : false;
        const fileName = `${values.leases[values.calcTarget].number}-${
          values.customer.name
        }-${customer ? "Customer" : "Rep"}-${getUglyDate()}.pdf`;
        let doc = new PDFDocument({ autoFirstPage: false });
        doc.pipe(fs.createWriteStream(filePath + "/" + fileName));

        const docWidth = 612;
        const docHeight = 792;
        const margin = 50;
        const docInnerWidth = docWidth - margin * 2;
        const halfCol = docInnerWidth / 2;
        const quarterCol = docInnerWidth / 4;

        doc.addPage({
          margin: margin,
        });

        // header
        // discrete function so it can be called at the top of each page
        let header = () => {
          // logos
          doc.image(
            path.resolve(
              __dirname,
              "../../public/assets/img/myadmin_logo_FINAL.png"
            ),
            docWidth - margin - 120,
            margin,
            { width: 120 }
          );
          if (values.rep.dealer && values.rep.dealer.logo) {
            doc.image(
              path.resolve(
                __dirname,
                "../../public/assets/logo/" + values.rep.dealer.logo
              ),
              margin,
              margin,
              { fit: [120, 50] }
            );
          }
          doc.font("Helvetica").fontSize(8);
          doc.text("myadmincentral.com", { align: "right" });

          doc.fillColor("#1066a3").font("Helvetica-Bold").fontSize(20);
          doc.text(customer ? "Customer Quote" : "Sales Quote", margin, 110);

          // by box
          doc.rect(357, 80, 205, 48).stroke("#ced0da");
          doc.fillColor("#000000").fontSize(10);
          doc.text("Requested by:", 367, 90);
          doc.text("Manager:", 367, 108);
          doc.font("Helvetica");
          doc.text(
            values.rep.fullName || "",
            docWidth - margin - 10 - doc.widthOfString(values.rep.fullName),
            90
          );
          if (values.rep.manager)
            doc.text(
              values.rep.manager.fullName || "",
              docWidth -
                margin -
                10 -
                doc.widthOfString(values.rep.manager.fullName),
              108
            );

          // customer box
          doc.rect(margin, 133, docInnerWidth, 94).stroke("#ced0da");
          doc
            .moveTo(margin + 10, 193)
            .lineTo(margin + docInnerWidth - 10, 191)
            .stroke("#ced0da");
          doc.font("Helvetica-Bold");
          doc.text("Customer Name:", margin + 15, 145);
          doc.text("Customer Address:", margin + 179, 145);
          doc.text("Leasing Company:", margin + 358, 145);
          doc.text("Lease Number:", margin + 358, 172);

          doc.text("Quote Type:", margin + 15, 205);
          doc.text("Lease Start:", margin + 179, 205);
          doc.text("Lease End:", margin + 358, 205);
          doc
            .rect(
              values.leases[values.calcTarget].quote === "Full"
                ? 81 + margin
                : 122 + margin,
              205,
              8,
              8
            )
            .fillAndStroke("#1066a3", "#1066a3")
            .fillColor("#000000");
          doc
            .rect(
              values.leases[values.calcTarget].quote === "Full"
                ? 122 + margin
                : 81 + margin,
              205,
              8,
              8
            )
            .stroke("#ced0da");

          doc.font("Helvetica");
          doc.text("Full", margin + 94, 205);
          doc.text("Partial", margin + 135, 205);

          if (values.customer) {
            doc.text(values.customer.name || "", margin + 15, 158, {
              width: 154,
            });
            doc.text(values.customer.address || "", margin + 179, 158, {
              width: 169,
            });
          }
          doc.text(
            values.leases[values.calcTarget].company || "",
            margin + 358,
            158
            // { width: 144 }
          );
          doc.text(
            values.leases[values.calcTarget].number || "",
            margin + 433,
            172
          );
          doc.text(workbook.startDate || "", margin + 241, 205);
          doc.text(workbook.endDate || "", margin + 418, 205);
        };
        header();

        // term box
        doc.rect(margin, 232, quarterCol, 411).stroke("#ced0da");

        doc.font("Helvetica-Bold").text("Original term:", margin + 15, 244);
        doc
          .rect(margin + 15, 258, quarterCol - 30, 20)
          .fillAndStroke("#f1f4f8", "#f1f4f8")
          .fillColor("#000000");
        doc
          .font("Helvetica")
          .text(workbook.originalTerm || "", margin + 25, 263);

        doc
          .font("Helvetica-Bold")
          .text("Remaining Unbilled Payments:", margin + 15, 290, {
            width: quarterCol - 30,
          });
        doc
          .rect(margin + 15, 318, quarterCol - 30, 20)
          .fillAndStroke("#f1f4f8", "#f1f4f8")
          .fillColor("#000000");
        doc
          .font("Helvetica")
          .text(workbook.remainingTerm || "", margin + 25, 323);

        doc.font("Helvetica-Bold").text("Payment Amount:", margin + 15, 350);
        doc.font("Helvetica").text("(pre-tax)", margin + 15, 364);
        doc
          .rect(margin + 15, 378, quarterCol - 30, 20)
          .fillAndStroke("#f1f4f8", "#f1f4f8")
          .fillColor("#000000");
        doc.text(
          "$" + workbook.currentEquipmentPayment || "",
          margin + 25,
          383
        );

        doc
          .font("Helvetica-Bold")
          .text("Quote Good Through:", margin + 15, 410);
        doc
          .rect(margin + 15, 424, quarterCol - 30, 20)
          .fillAndStroke("#f1f4f8", "#f1f4f8")
          .fillColor("#000000");
        doc
          .font("Helvetica")
          .text(workbook.quoteGoodThrough || "", margin + 25, 429);

        if (customer) {
          let prefix = isThisEquivalentToANumber(workbook.customerBtk)
            ? "$"
            : "";
          let postfix = workbook.customerBtk || ""; // prevents undefined from being printed
          doc.font("Helvetica-Bold").text("Buyout to Keep:", margin + 15, 456);
          doc
            .rect(margin + 15, 470, quarterCol - 30, 20)
            .fillAndStroke("#f1f4f8", "#f1f4f8")
            .fillColor("#000000");
          doc.font("Helvetica").text(prefix + postfix, margin + 25, 475);

          prefix = isThisEquivalentToANumber(workbook.customerBtr) ? "$" : "";
          postfix = workbook.customerBtr || "";
          doc
            .font("Helvetica-Bold")
            .text("Buyout to Return:", margin + 15, 502);
          doc
            .rect(margin + 15, 516, quarterCol - 30, 20)
            .fillAndStroke("#f1f4f8", "#f1f4f8")
            .fillColor("#000000");
          doc.font("Helvetica").text(prefix + postfix, margin + 25, 521);

          // doc.font("Helvetica-Bold").text("Lease Start:", margin + 15, 545);
          // doc
          //   .rect(margin + 15, 559, quarterCol - 30, 20)
          //   .fillAndStroke("#f1f4f8", "#f1f4f8")
          //   .fillColor("#000000");
          // doc
          //   .font("Helvetica")
          //   .text(workbook.startDate || "", margin + 25, 564);

          // doc.font("Helvetica-Bold").text("Lease End:", margin + 15, 588);
          // doc
          //   .rect(margin + 15, 602, quarterCol - 30, 20)
          //   .fillAndStroke("#f1f4f8", "#f1f4f8")
          //   .fillColor("#000000");
          // doc.font("Helvetica").text(workbook.endDate || "", margin + 25, 607);
        } else {
          if (Number(workbook.companyBtk) !== 0) {
            doc
              .font("Helvetica-Bold")
              .text("Buyout to Keep:", margin + 15, 456);
            doc
              .rect(margin + 15, 470, quarterCol - 30, 20)
              .fillAndStroke("#f1f4f8", "#f1f4f8")
              .fillColor("#000000");
            let text = isThisEquivalentToANumber(workbook.companyBtk)
              ? "$" +
                round(
                  sum(
                    workbook.companyBtk,
                    product(
                      workbook.remainingTerm,
                      workbook.currentServicePayment,
                      workbook.percentage / 100
                    ),
                    product(
                      workbook.remainingTerm,
                      workbook.passThroughService
                    ),
                    workbook.smua
                  )
                )
              : workbook.companyBtk;
            doc.font("Helvetica").text(text, margin + 25, 475);
          }

          if (Number(workbook.companyBtr) !== 0) {
            doc
              .font("Helvetica-Bold")
              .text("Buyout to Return:", margin + 15, 502);
            doc
              .rect(margin + 15, 516, quarterCol - 30, 20)
              .fillAndStroke("#f1f4f8", "#f1f4f8")
              .fillColor("#000000");
            let text = isThisEquivalentToANumber(workbook.companyBtr)
              ? "$" +
                round(
                  sum(
                    workbook.companyBtr,
                    product(
                      workbook.remainingTerm,
                      workbook.currentServicePayment,
                      workbook.percentage / 100
                    ),
                    product(
                      workbook.remainingTerm,
                      workbook.passThroughService
                    ),
                    workbook.smua
                  )
                )
              : workbook.companyBtr;
            doc.font("Helvetica").text(text, margin + 25, 521);
          }

          if (Number(workbook.companyUtk) !== 0) {
            doc
              .font("Helvetica-Bold")
              .text("Upgrade to Keep:", margin + 15, 548);
            doc
              .rect(margin + 15, 562, quarterCol - 30, 20)
              .fillAndStroke("#f1f4f8", "#f1f4f8")
              .fillColor("#000000");
            let text = isThisEquivalentToANumber(workbook.companyUtk)
              ? "$" +
                round(
                  sum(
                    workbook.companyUtk,
                    product(
                      workbook.remainingTerm,
                      workbook.currentServicePayment,
                      workbook.percentage / 100
                    ),
                    product(
                      workbook.remainingTerm,
                      workbook.passThroughService
                    ),
                    workbook.smua
                  )
                )
              : workbook.companyUtk;
            doc.font("Helvetica").text(text, margin + 25, 567);
          }

          if (Number(workbook.companyUtr) !== 0) {
            doc
              .font("Helvetica-Bold")
              .text("Upgrade to Return:", margin + 15, 594);
            doc
              .rect(margin + 15, 608, quarterCol - 30, 20)
              .fillAndStroke("#f1f4f8", "#f1f4f8")
              .fillColor("#000000");
            let text = isThisEquivalentToANumber(workbook.companyUtr)
              ? "$" +
                round(
                  sum(
                    workbook.companyUtr,
                    product(
                      workbook.remainingTerm,
                      workbook.currentServicePayment,
                      workbook.percentage / 100
                    ),
                    product(
                      workbook.remainingTerm,
                      workbook.passThroughService
                    ),
                    workbook.smua
                  )
                )
              : workbook.companyUtr;
            doc.font("Helvetica").text(text, margin + 25, 613);
          }
        }

        // gear box
        doc
          .rect(margin + quarterCol, 232, halfCol + quarterCol, 411)
          .stroke("#ced0da");
        doc.font("Helvetica-Bold");
        doc.text("Gear:", margin + quarterCol + 15, 244);
        if (values.leases[values.calcTarget].quote === "Full") {
          doc.text("Machine:", margin + quarterCol + 90, 244);
          doc.text("Location:", margin + quarterCol + 175, 244);
          doc.text("Serial Number", margin + quarterCol + 250 + 25, 244);
        } else {
          doc.text("Machine:", margin + quarterCol + 75, 244);
          doc.text("Location:", margin + quarterCol + 145, 244);
          doc.text("Serial Number", 385, 244);
          doc.text("Plan", docWidth - margin - 15 - 82, 244);
        }

        doc.font("Helvetica");

        let firstPageLimit = customer ? 18 : 7;

        let machineCount =
          machines.length > firstPageLimit + 1
            ? firstPageLimit
            : firstPageLimit + 1;
        doc.fontSize(9);
        machines.slice(0, machineCount).forEach((machine, index) => {
          let count = 258 + 20 * index;
          if (index % 2 === 0)
            doc
              .rect(
                margin + quarterCol + 15,
                count,
                halfCol + quarterCol - 30,
                20
              )
              .fillAndStroke("#f1f4f8", "#f1f4f8")
              .fillColor("#000000");
          doc.text(machine.model || "", margin + quarterCol + 15, count + 5);
          if (values.leases[values.calcTarget].quote === "Full") {
            doc.text(machine.make || "", margin + quarterCol + 90, count + 5);
            doc.text(
              machine.location || "",
              margin + quarterCol + 175,
              count + 5
            );
            doc.text(
              machine.serial || "",
              margin + quarterCol + 250 + 25,
              count + 5
            );
          } else {
            doc.text(machine.make || "", margin + quarterCol + 75, count + 5);
            doc.text(
              machine.location || "",
              margin + quarterCol + 145,
              count + 5
            );
            doc.text(machine.serial || "", 385, count + 5);
            doc.text(machine.action, docWidth - margin - 15 - 82, count + 5);
          }
        });
        doc.fontSize(10);
        if (machineCount === firstPageLimit) {
          doc.text(
            "Continued on next page",
            margin + quarterCol + 25,
            customer ? 623 : 403
          );
        }

        // invoice box
        if (!customer) {
          doc
            .moveTo(margin + quarterCol, 432)
            .lineTo(margin + docInnerWidth, 432)
            .stroke("#ced0da");
          doc.font("Helvetica-Bold");
          doc.text("Current Invoice Breakdown:", margin + quarterCol + 15, 444);
          doc.text("Upfront", margin + quarterCol + 15 + 242, 444);
          doc.text("Monthly", margin + quarterCol + 15 + 314, 444);

          doc.text("Payment", margin + quarterCol + 15 + 170, 460);
          doc.text("Tax", margin + quarterCol + 15 + 242, 460);
          doc.text("Tax", margin + quarterCol + 15 + 314, 460);

          doc.font("Helvetica");

          doc
            .rect(margin + quarterCol + 15, 474, halfCol + quarterCol - 30, 20)
            .fillAndStroke("#f1f4f8", "#f1f4f8")
            .fillColor("#000000");
          doc.text("Equipment Payment:", margin + quarterCol + 25, 479);
          doc.text(
            "$" + monify(workbook.currentEquipmentPayment, " - "),
            margin + quarterCol + 15 + 170,
            479
          );
          doc.text(
            "$" + monify(workbook.currentEquipmentPaymentUpfront, " - "),
            margin + quarterCol + 15 + 242,
            479
          );
          doc.text(
            "$" + monify(workbook.currentEquipmentPaymentMonthly, " - "),
            margin + quarterCol + 15 + 314,
            479
          );

          doc.text("Service/MA Payment:", margin + quarterCol + 25, 499);
          doc.text(
            "$" + monify(workbook.currentServicePayment, " - "),
            margin + quarterCol + 15 + 170,
            499
          );
          doc.text(
            "$" + monify(workbook.currentServicePaymentUpfront, " - "),
            margin + quarterCol + 15 + 242,
            499
          );
          doc.text(
            "$" + monify(workbook.currentServicePaymentMonthly, " - "),
            margin + quarterCol + 15 + 314,
            499
          );

          doc
            .rect(margin + quarterCol + 15, 514, halfCol + quarterCol - 30, 20)
            .fillAndStroke("#f1f4f8", "#f1f4f8")
            .fillColor("#000000");
          doc.text("Fuel/Freight:", margin + quarterCol + 25, 519);
          doc.text(
            "$" + monify(workbook.fuelFreight, " - "),
            margin + quarterCol + 15 + 170,
            519
          );
          doc.text(
            "$" + monify(workbook.fuelFreightUpfront, " - "),
            margin + quarterCol + 15 + 242,
            519
          );
          doc.text(
            "$" + monify(workbook.fuelFreightMonthly, " - "),
            margin + quarterCol + 15 + 314,
            519
          );

          doc.text("Late Charges:", margin + quarterCol + 25, 539);
          doc.text(
            "$" + monify(workbook.lateCharges, " - "),
            margin + quarterCol + 15 + 170,
            539
          );
          doc.text(
            "$" + monify(workbook.lateChargesUpfront, " - "),
            margin + quarterCol + 15 + 242,
            539
          );
          doc.text(
            "$" + monify(workbook.lateChargesMonthly, " - "),
            margin + quarterCol + 15 + 314,
            539
          );

          doc
            .rect(margin + quarterCol + 15, 554, halfCol + quarterCol - 30, 20)
            .fillAndStroke("#f1f4f8", "#f1f4f8")
            .fillColor("#000000");
          doc.text("Misc. Items (see Notes):", margin + quarterCol + 25, 559);
          doc.text(
            "$" + monify(workbook.miscItems, " - "),
            margin + quarterCol + 15 + 170,
            559
          );
          doc.text(
            "$" + monify(workbook.miscItemsUpfront, " - "),
            margin + quarterCol + 15 + 242,
            559
          );
          doc.text(
            "$" + monify(workbook.miscItemsMonthly, " - "),
            margin + quarterCol + 15 + 314,
            559
          );

          doc
            .moveTo(margin + quarterCol + 15, 583)
            .lineTo(margin + docInnerWidth - 15, 583)
            .stroke("#000000");
          doc.text(
            "$" +
              round(
                sum(
                  workbook.currentEquipmentPayment,
                  workbook.currentServicePayment,
                  workbook.fuelFreight,
                  workbook.lateCharges,
                  workbook.miscItems
                )
              ),
            margin + quarterCol + 15 + 170,
            594
          );
          doc.text(
            "$" +
              round(
                sum(
                  workbook.currentEquipmentPaymentUpfront,
                  workbook.currentServicePaymentUpfront,
                  workbook.fuelFreightUpfront,
                  workbook.lateChargesUpfront,
                  workbook.miscItemsUpfront
                )
              ),
            margin + quarterCol + 15 + 242,
            594
          );
          doc.text(
            "$" +
              round(
                sum(
                  workbook.currentEquipmentPaymentMonthly,
                  workbook.currentServicePaymentMonthly,
                  workbook.fuelFreightMonthly,
                  workbook.lateChargesMonthly,
                  workbook.miscItemsMonthly
                )
              ),
            margin + quarterCol + 15 + 314,
            594
          );

          doc
            .rect(docWidth - margin - 15 - 160, 613, 80, 20)
            .fillAndStroke("#edf5fd", "#ced0da")
            .fillColor("#000000");
          doc
            .moveTo(docWidth - margin - 15 - 80, 613)
            .lineTo(docWidth - margin - 15, 613)
            .lineTo(docWidth - margin - 15, 633)
            .lineTo(docWidth - margin - 15 - 80, 633)
            .stroke("#ced0da");
          doc
            .font("Helvetica-Bold")
            .text("TOTAL:", docWidth - margin - 15 - 160 + 10, 618);

          let total = round(
            sum(
              workbook.currentEquipmentPayment,
              workbook.currentEquipmentPaymentUpfront,
              workbook.currentEquipmentPaymentMonthly,
              workbook.currentServicePayment,
              workbook.currentServicePaymentUpfront,
              workbook.currentServicePaymentMonthly,
              workbook.fuelFreight,
              workbook.fuelFreightUpfront,
              workbook.fuelFreightMonthly,
              workbook.lateCharges,
              workbook.lateChargesUpfront,
              workbook.lateChargesMonthly,
              workbook.miscItems,
              workbook.miscItemsUpfront,
              workbook.miscItemsMonthly
            )
          );
          doc
            .font("Helvetica")
            .text(
              "$" + total,
              docWidth - margin - 15 - 10 - doc.widthOfString("$" + total),
              618
            );
        }

        if (!customer) {
          // note box
          doc.rect(margin, 648, docInnerWidth, 94).stroke("#ced0da");
          doc.font("Helvetica-Bold").text("Notes:", margin + 15, 660);
          doc.font("Helvetica").text(workbook.repnotes || "", margin + 15, 676);
        } else {
          doc.rect(margin, 648, docInnerWidth, 94).stroke("#ced0da");
          doc.font("Helvetica-Bold").text("Customer Notes:", margin + 15, 660);
          doc.font("Helvetica").text(workbook.notes || "", margin + 15, 676);
        }

        // second page (gear overflow)
        while (machineCount < machines.length) {
          doc.addPage({
            margin: margin,
          });
          header();
          doc.rect(margin, 232, docInnerWidth, 510).stroke("#ced0da");

          doc.font("Helvetica-Bold");
          doc.text("Gear:", margin + 25, 244);
          doc.text("Serial Number", margin + 179, 244);
          if (values.leases[values.calcTarget].quote === "Partial") {
            doc.text("Plan", docWidth - margin - 15 - 82, 244);
          }
          doc.font("Helvetica");

          // can fit 23 per page
          machines
            .slice(machineCount, machineCount + 23)
            .forEach((machine, index) => {
              let count = 258 + 20 * index;
              if (index === 22 && machineCount + 23 < machines.length) {
                doc.text("Continued on next page", margin + 25, count + 5);
              } else {
                if (index === 22) machineCount++; // handling case of exactly 23 remaining machines
                if (index % 2 === 0)
                  doc
                    .rect(margin + 15, count, docInnerWidth - 30, 20)
                    .fillAndStroke("#f1f4f8", "#f1f4f8")
                    .fillColor("#000000");
                doc.text(machine.model || "", margin + 25, count + 5);
                doc.text(machine.serial || "", margin + 179, count + 5);
                if (values.leases[values.calcTarget].quote === "Partial") {
                  doc.text(
                    machine.action,
                    docWidth - margin - 15 - 82,
                    count + 5
                  );
                }
              }
            });

          machineCount += 22;
        }

        doc.end();

        return Upload.update(
          {
            name: fileName,
            notes: "",
          },
          {
            where: {
              id: {
                [Op.eq]: newUpload.id,
              },
            },
          }
        );
      })
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  });
