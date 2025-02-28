import { useNavigate } from "react-router-dom";
import { manageJobsData } from "../assets/assets";
import moment from "moment";

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b max-sm:hidden">#</th>
              <th className="text-left py-2 px-4 border-b">Job Title</th>
              <th className="text-left py-2 px-4 border-b max-sm:hidden">
                Date
              </th>
              <th className="text-left py-2 px-4 border-b max-sm:hidden">
                Location
              </th>
              <th className="text-center py-2 px-4 border-b">Applicants</th>
              <th className="text-left py-2 px-4 border-b">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((item, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(item.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {item.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.applicants}
                </td>
                <td className="py-2 px-4 border-b">
                  <input className="sclae-125 ml-4" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={() => navigate("/dashboard/add-job")} className="bg-black text-white py-2 px-4 rounded">
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
