import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const directory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: directory });

export default [...compat.extends("next/core-web-vitals", "next/typescript")];
