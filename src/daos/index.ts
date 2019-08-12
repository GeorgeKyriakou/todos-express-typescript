const usingMockDb = (process.env.USE_MOCK_DB || "").toLowerCase();
let todoDaoPath = "./Todos/TodoDao";

if (usingMockDb === "true") {
  todoDaoPath += ".mock";
}

// tslint:disable:no-var-requires
export const { TodosDao } = require(todoDaoPath);
