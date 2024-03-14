import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import { Data } from "@/lib/DataContext";

export default function HomePage() {
  const { events, categories } = Data();

  return (
    <>
      <WelcomeCard />
      <CategoryList categories={categories} />
      <EventList events={events} title={"Aktuelle Events"} />
    </>
  );
}
