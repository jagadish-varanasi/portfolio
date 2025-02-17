import React from "react";
import MultipleSelector, {
  Option,
} from "@repo/ui/components/multiple-selector";

const OPTIONS2 = [
  {
    label: "vara@gmail.com",
    value: "clyoi9eu1000911x3fy6gk6v0",
  },
  {
    label: "jaga@gmail.com",
    value: "clyph5ewy0000h9ksh0lxgqcy",
  },
  {
    label: "guru@gmail.com",
    value: "clypk8ut10000cksvuf5m2ync",
  },
  {
    label: "bhim@gmail.com",
    value: "clypiwkwu0002h9kstsk7izfy",
  },
];

const MultipleUsersSelector = ({
  options,
  onChange,
  placeholder,
}: {
  options: Array<Option>;
  onChange: (selection: Option[]) => void;
  placeholder: string;
}) => {
  console.log(options, "inside");
  return (
    <div className="w-full pr-10">
      <MultipleSelector
        options={options}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
        onChange={onChange}
      />
    </div>
  );
};

export default MultipleUsersSelector;
