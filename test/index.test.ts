import Excel from "../src/index";
var assert = require("assert");
const path = require("path");
const fs = require("fs");

describe("#addWorkSheet()", function () {
  const excel = new Excel();
  excel.addWorkSheet("test1", { margins: { top: 1.2 } });
  describe("should add a workSheet and named workSheet", function () {
    it("name is test", function () {
      assert.equal(excel.ws.name, "test1");
    });
    it("index is 0", function () {
      assert.equal(excel.wsIndex, 0);
    });
    it("currentRowColumnItem is equal to initRowColumnItem", function () {
      const initRowColumnItem = {
        row: 1,
        column: 1,
        initCol: 1,
        initRow: 1,
        depthMap: {},
        depth: 1,
      };
      assert.equal(
        JSON.stringify(excel.currentRowColumnItem),
        JSON.stringify(initRowColumnItem)
      );
    });
    it("workSheet options", function () {
      assert.equal(Object.keys(excel.ws.opts).length > 0, true);
    });
  });
});

describe("#selectSheet()", function () {
  const excel = new Excel();
  excel.addWorkSheet("test1", { margins: { top: 1.2 } });
  excel.addWorkSheet("test2", { margins: { top: 1.2 } });
  describe("it should be thr right ws when select sheet", function () {
    it("index 0 is test1", function () {
      excel.selectSheet(0);
      assert.equal(excel.ws.name, "test1");
    });
    it("index 1 is test2", function () {
      excel.selectSheet(1);
      assert.equal(excel.ws.name, "test2");
    });
  });
});

describe("#setFileName()", function () {
  const excel = new Excel();
  describe("it should be the myTest when set file name myTest", function () {
    it("index 0 is test1", function () {
      excel.setFileName("myTest");
      assert.equal(excel.fileName, "myTest");
    });
  });
});

describe("#setSavePath()", function () {
  const excel = new Excel();
  const pathUtil = path.join(__dirname, "../src/util");
  excel.setSavePath(pathUtil);
  describe("it should setSavePath right", function () {
    it("equal", function () {
      assert.equal(excel.path, pathUtil);
    });
    it("readFile for test", function () {
      const files = fs.readdirSync(pathUtil);
      assert.equal(files.includes("util.ts"), true);
    });
  });
});

describe("#setRowHeight()", function () {
  const excel = new Excel();
  excel.addWorkSheet("test1", { margins: { top: 1.2 } });
  describe("it should 100 when set row height 100", function () {
    it("set row height 100", function () {
      excel.setRowHeight(1, 100);
      assert.equal(
        excel.ws.rows["1"].ht === 100 &&
          excel.ws.rows["1"].customHeight === true,
        true
      );
    });
  });
});

describe("#setColWidth()", function () {
  const excel = new Excel();
  excel.addWorkSheet("test1", { margins: { top: 1.2 } });
  describe("it should 100 when set col width 100", function () {
    it("set col width 100", function () {
      excel.setColWidth(1, 100);
      assert.equal(
        excel.ws.cols["1"].colWidth === 100 &&
          excel.ws.cols["1"].customWidth === true,
        true
      );
    });
  });
});
