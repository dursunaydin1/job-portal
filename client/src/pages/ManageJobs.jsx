import { useNavigate, useEffect, useState, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState(false);

  // Function to fetch Company Jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change Job Visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl sm:text-2xl text-center text-gray-500">
          No jobs found
        </p>
      </div>
    ) : (
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b max-sm:hidden">
                  #
                </th>
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
              {jobs.map((item, index) => (
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
                    <input
                      className="sclae-125 ml-4"
                      type="checkbox"
                      checked={item.visible}
                      onChange={() => changeJobVisibility(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="bg-black text-white py-2 px-4 rounded"
          >
            Add new job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;
