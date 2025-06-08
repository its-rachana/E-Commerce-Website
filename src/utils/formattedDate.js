const getFormattedDate = () =>{
    const date = new Date();

    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    // Add ordinal suffix
    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
const FormattedDateComponent = () => {
    return (
            <p>{getFormattedDate()}</p>
    );
};

export default FormattedDateComponent;
