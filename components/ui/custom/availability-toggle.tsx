import { Badge } from "../badge";

export const AvailabilityBadge = ({ condition }: { condition: boolean }) => {
  return (
    <Badge variant={condition ? "default" : "destructive"}>
      {condition ? "Available" : "Disabled"}
    </Badge>
  );
};
