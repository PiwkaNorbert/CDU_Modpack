import useSuggestedModpackData from "../API/useSuggestedModpackData";
import { useQueryClient } from "@tanstack/react-query";
import ModpackListView from "../Components/ModpackListView";

const SuggestedPackListPage = () => {
  const queryClient = useQueryClient();
  const packData = useSuggestedModpackData(queryClient);

  return <ModpackListView packData={packData} />;
};

export default SuggestedPackListPage;
