import "tailwindcss/tailwind.css";
const Sidebar = () => (
    <div className="w-1/5 bg-gray-100 h-screen p-4">
      <div className="font-bold text-xl mb-6">Quyl.</div>
      <ul className="space-y-4">
        <li className="text-gray-600 font-semibold">Dashboard</li>
        <li className="text-gray-600 font-semibold">Students</li>
        <li className="text-gray-600 font-semibold">Chapter</li>
        <li className="text-gray-600 font-semibold">Help</li>
        <li className="text-gray-600 font-semibold">Reports</li>
        <li className="text-gray-600 font-semibold">Settings</li>
      </ul>
    </div>
  );

  export default Sidebar