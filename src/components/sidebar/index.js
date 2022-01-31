import SmallCalendar from "../smallCalendar";

const Sidebar = ({ data, active }) => {
  return (
    <aside
      className={`tw-pr-4 tw-pt-4 tw-pb-4 ${
        active ? "tw-w-96" : "tw-w-0 tw-invisible"
      } tw-transition-all tw-duration-300`}
    >
      <SmallCalendar data={data} active={active} />
    </aside>
  );
};

export default Sidebar;
