export const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("pt-BR", { month: "long" });
    return `${day} de ${month}`;
};