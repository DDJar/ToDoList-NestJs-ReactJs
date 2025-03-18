export const renderEmptyRows = (itemsPerPage, total, addNum) => {
    const rowsToRender = itemsPerPage - total;
    let emptyRows = [];

    for (let i = 0; i < rowsToRender; i++) {
        let cells = [];
        for (let j = 0; j < addNum; j++) {
            cells.push(<td key={`empty-cell-${j}`} className="px-6 py-4"></td>);
        }

        emptyRows.push(
            <tr
                key={`empty-${i}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
                <td className="w-4 p-4"></td>
                {cells}
            </tr>,
        );
    }

    return emptyRows;
};
