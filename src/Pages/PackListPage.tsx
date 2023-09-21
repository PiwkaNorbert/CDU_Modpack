import useModpackData from "../API/useModpackData";
import { useQueryClient } from "@tanstack/react-query";
import ModpackListView from "../Components/ModpackListView";

const PackListPage = () => {
  const queryClient = useQueryClient();
  const packData = useModpackData(queryClient);

  return <ModpackListView packData={packData} category="main" />;
};

export default PackListPage;
