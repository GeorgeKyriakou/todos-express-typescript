import find from "find";
import Jasmine from "jasmine";

// Init Jasmine
const jasmine = new Jasmine(null);

// Set location of test files
jasmine.loadConfig({
  random: true,
  spec_dir: "spec",
  spec_files: ["./**/*.spec.ts"],
  stopSpecOnExpectationFailure: false
});

// On complete callback function
jasmine.onComplete((passed: boolean) => {
  if (passed) {
    console.log("All tests have passed :)");
  } else {
    console.error("At least one test has failed :(");
  }
});

// Run all or a single unit-test
if (process.argv[3]) {
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>process.argv[3]>>>>>>>>>>>>>>>>>>>>>>>>",
    process.argv[3]
  );

  const testFile = process.argv[3];
  find.file(testFile + ".spec.ts", "./spec", files => {
    if (files.length === 1) {
      jasmine.execute([files[0]], testFile);
    } else {
      console.error("Test file not found!");
    }
  });
} else {
  jasmine.execute();
}
