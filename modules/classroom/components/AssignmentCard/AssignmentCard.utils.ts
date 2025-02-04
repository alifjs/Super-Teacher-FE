export const formatDeadline = (dateString: Date) => {
    return new Date(new Date(dateString).getTime())
      .toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/,/g, "")
      .replace(/(\d{1,2}) (\d{1,2}) (\d{4})/, "$1/$2/$3");
  };
  