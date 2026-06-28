import { Badge } from "@/components/ui/badge";

type Status = "Applied" | "Shortlisted" | "Finalist" | "Won";

const statusVariantMap: Record<Status, "applied" | "shortlisted" | "finalist" | "won"> = {
  Applied: "applied",
  Shortlisted: "shortlisted",
  Finalist: "finalist",
  Won: "won",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant={statusVariantMap[status] || "default"}>
      {status}
    </Badge>
  );
}
