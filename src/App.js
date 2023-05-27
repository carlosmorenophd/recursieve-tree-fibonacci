import { useFormik } from "formik";
import * as Yup from "yup";
import Tree from "react-d3-tree";
import { useState } from "react";
import useFibonacci from "./algorithm/fibonacci";
import classNames from "classnames";

const schema = Yup.object().shape({
  n: Yup.number().min(2, "Min number of calculate").required("Required"),
});
function App() {
  const { fibonacci, getTree } = useFibonacci();
  const [tree, setTree] = useState({
    name: "N",
    attributes: {
      tag: "Parent - N",
    },
    children: [],
  });
  const [result, setResult] = useState(0);

  const formik = useFormik({
    initialValues: {
      n: 6,
    },
    schema: schema,
    onSubmit: (values) => {
      setResult(fibonacci(values.n));
      setTree(getTree())
    },
  });

  const inputClass = classNames(
    "px-3",
    "py-4",
    "placeholder-slate-300",
    "text-slate-600",
    "relative",
    "bg-white",
    "rounded",
    "text-base",
    "border-0",
    "shadow",
    "outline-none",
    "focus:outline-none",
    "focus:ring",
    "w-full"
  );

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="n">Calculate fibonacci</label>
        <input
          className={inputClass}
          id="n"
          name="n"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.n}
        />
        {formik.errors.n && formik.touched.n ? (
          <div class="bg-indigo-900 text-center py-4 lg:px-4">
            <div
              class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Error
              </span>
              <span class="font-semibold mr-2 text-left flex-auto">
                {formik.errors.n}
              </span>
              <svg
                class="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </div>
          </div>
        ) : null}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Calculate
        </button>
        <div>Resultado = {result}</div>
      </form>

      <div className="w-3/2" style={{ height: 1500 }}>
        <Tree data={tree} orientation="vertical" />
      </div>
    </div>
  );
}

export default App;
