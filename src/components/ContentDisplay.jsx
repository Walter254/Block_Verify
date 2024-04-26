import React, { useEffect, useState } from 'react';

function ContentDisplay() {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/content'); //{config_description: "Ensure the API endpoint matches the server configuration"}
      if (!response.ok) {
        console.error('Failed to fetch content:', response.statusText);
        return;
      }
      const data = await response.json();
      setContentList(data);
    };
    fetchData().catch(error => console.error('Error fetching content:', error));
  }, []);

  return (
    <div>
      {contentList.map((content, index) => (
        <div key={index}>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          {/* Additional details and options can be rendered here */}
        </div>
      ))}
    </div>
  );
}

export default ContentDisplay;