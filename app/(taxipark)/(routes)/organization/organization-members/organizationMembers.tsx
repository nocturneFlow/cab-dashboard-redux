import React, { useEffect, useState } from "react";
import axios from "axios";

const OrganizationMembers: React.FC = () => {
  // Replace with your actual Clerk organization ID
  const organizationId = "org_2es5MmaG8xJcxf7AhVsyHFqzd0C";

  // State to hold the list of organization members
  const [members, setMembers] = useState<any[]>([]);

  // Fetch the list of organization members
  const fetchOrganizationMembers = async () => {
    try {
      // Replace with your actual API endpoint and key
      const apiKey = "sk_test_e1YHgDarniMeSOjXwTQQaQZABy61sseNbuIXA9lPiP";
      const url = `https://api.clerk.com/v1/organizations/${organizationId}/members`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      // Set the fetched data to the state
      setMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch organization members:", error);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchOrganizationMembers();
  }, []);

  return (
    <div>
      <h1>Organization Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationMembers;
