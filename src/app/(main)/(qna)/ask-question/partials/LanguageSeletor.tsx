"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

const monacoLanguages = [
  { key: "plaintext", value: "plaintext", display: "Plain Text" },
  { key: "abap", value: "abap", display: "ABAP" },
  { key: "apex", value: "apex", display: "Apex" },
  { key: "azcli", value: "azcli", display: "Azure CLI" },
  { key: "bat", value: "bat", display: "Batch" },
  { key: "c", value: "c", display: "C" },
  { key: "clojure", value: "clojure", display: "Clojure" },
  { key: "coffeescript", value: "coffeescript", display: "CoffeeScript" },
  { key: "cpp", value: "cpp", display: "C++" },
  { key: "csharp", value: "csharp", display: "C#" },
  { key: "csp", value: "csp", display: "CSP" },
  { key: "css", value: "css", display: "CSS" },
  { key: "dart", value: "dart", display: "Dart" },
  { key: "dockerfile", value: "dockerfile", display: "Dockerfile" },
  { key: "ecl", value: "ecl", display: "ECL" },
  { key: "elixir", value: "elixir", display: "Elixir" },
  { key: "fsharp", value: "fsharp", display: "F#" },
  { key: "go", value: "go", display: "Go" },
  { key: "graphql", value: "graphql", display: "GraphQL" },
  { key: "handlebars", value: "handlebars", display: "Handlebars" },
  { key: "haskell", value: "haskell", display: "Haskell" },
  { key: "html", value: "html", display: "HTML" },
  { key: "ini", value: "ini", display: "INI" },
  { key: "java", value: "java", display: "Java" },
  { key: "javascript", value: "javascript", display: "JavaScript" },
  { key: "json", value: "json", display: "JSON" },
  { key: "julia", value: "julia", display: "Julia" },
  { key: "kotlin", value: "kotlin", display: "Kotlin" },
  { key: "less", value: "less", display: "LESS" },
  { key: "lua", value: "lua", display: "Lua" },
  { key: "markdown", value: "markdown", display: "Markdown" },
  { key: "mips", value: "mips", display: "MIPS" },
  { key: "msdax", value: "msdax", display: "MSDAX" },
  { key: "mysql", value: "mysql", display: "MySQL" },
  { key: "objective-c", value: "objective-c", display: "Objective-C" },
  { key: "pascal", value: "pascal", display: "Pascal" },
  { key: "perl", value: "perl", display: "Perl" },
  { key: "php", value: "php", display: "PHP" },
  { key: "postiats", value: "postiats", display: "Postiats" },
  { key: "powerquery", value: "powerquery", display: "Power Query" },
  { key: "powershell", value: "powershell", display: "PowerShell" },
  { key: "pug", value: "pug", display: "Pug" },
  { key: "python", value: "python", display: "Python" },
  { key: "r", value: "r", display: "R" },
  { key: "razor", value: "razor", display: "Razor" },
  { key: "redis", value: "redis", display: "Redis" },
  { key: "redshift", value: "redshift", display: "Redshift" },
  { key: "ruby", value: "ruby", display: "Ruby" },
  { key: "rust", value: "rust", display: "Rust" },
  { key: "sb", value: "sb", display: "Small Basic" },
  { key: "scala", value: "scala", display: "Scala" },
  { key: "scheme", value: "scheme", display: "Scheme" },
  { key: "scss", value: "scss", display: "SCSS" },
  { key: "shell", value: "shell", display: "Shell Script" },
  { key: "sol", value: "sol", display: "Solidity" },
  { key: "sql", value: "sql", display: "SQL" },
  { key: "st", value: "st", display: "Structured Text" },
  { key: "swift", value: "swift", display: "Swift" },
  { key: "tcl", value: "tcl", display: "Tcl" },
  { key: "typescript", value: "typescript", display: "TypeScript" },
  { key: "vb", value: "vb", display: "VB.NET" },
  { key: "xml", value: "xml", display: "XML" },
  { key: "yaml", value: "yaml", display: "YAML" },
];

type LanguageSelectProps = {
  setCurlanguage: React.Dispatch<React.SetStateAction<string>>;
  curLaguage: string | undefined;
  className?: string;
};
const LanguageSeletor = ({
  curLaguage,
  setCurlanguage,
  className,
}: LanguageSelectProps) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpenPopover}
          className={cn("w-full justify-between", className)}
        >
          {curLaguage
            ? monacoLanguages.find((lang) => lang.value === curLaguage)?.display
            : "Select language..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] w-[360px] p-0">
        <Command>
          <CommandInput placeholder="Search the language" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {monacoLanguages.map((lang) => (
                <CommandItem
                  key={lang.key}
                  value={lang.display}
                  onSelect={(currentValue) => {
                    const curLang =
                      currentValue === curLaguage ? "" : currentValue;
                    const selected = monacoLanguages.find(
                      (lang) => curLang && curLang === lang.display
                    );
                    setCurlanguage(selected?.value!);

                    setIsOpenPopover(false);
                  }}
                >
                  {lang.display}
                  <Check
                    className={cn(
                      "ml-auto",
                      curLaguage === lang.display ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSeletor;
