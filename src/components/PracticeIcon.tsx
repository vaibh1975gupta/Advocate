import React from "react";
import {
  ShieldAlert,
  Building2,
  Users,
  ReceiptText,
  FileText,
  Scale,
  LucideProps,
} from "lucide-react";

interface PracticeIconProps extends LucideProps {
  name: "ShieldAlert" | "Building2" | "Users" | "ReceiptText" | "FileText" | string;
}

export function PracticeIcon({ name, ...props }: PracticeIconProps) {
  switch (name) {
    case "ShieldAlert":
      return <ShieldAlert {...props} />;
    case "Building2":
      return <Building2 {...props} />;
    case "Users":
      return <Users {...props} />;
    case "ReceiptText":
      return <ReceiptText {...props} />;
    case "FileText":
      return <FileText {...props} />;
    default:
      return <Scale {...props} />;
  }
}
