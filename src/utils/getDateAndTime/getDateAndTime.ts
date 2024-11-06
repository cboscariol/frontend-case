export const getDateAndTime = (date: Date) => {
    const formattedDate = new Date(date)
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(".", "")
      .replace("de ", " ")
      .replace("de ", " ");

    const formattedTime = new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} - ${formattedTime}`;
  };
