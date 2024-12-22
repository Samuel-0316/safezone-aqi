import { redirect } from "next/navigation";

export const handleLocationSubmit = async (formData: FormData) => {
  const location = formData.get("location") as string;

  if (location.trim() !== "") {
    redirect(`/map?search_query=${location}`);
  }
};
