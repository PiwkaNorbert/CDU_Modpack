import { useIsFetching } from "@tanstack/react-query";
import Loading from "./Loading";

export default function FetchingIndicator() {
  const isFetching = useIsFetching();
  if (!isFetching) return null;
  return <Loading size='la-sm' fullScreen={false} other=''/>;
}
