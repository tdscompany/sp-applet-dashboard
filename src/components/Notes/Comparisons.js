const userId = localStorage.getItem("userId");

export const getUserComparisons = (usersDb, dbData) => {
    if(usersDb.includes(userId)) {
        const comparisons = Object.keys(dbData[userId]);
        const comparisonsArr = comparisons.map(comparison =>  comparison.split(','));
        return comparisonsArr;
    };
};

export const getComparisonsMatch = (userComparisons, selectedProj) => {
    const comparisonMatch = [];

    const sameLength = userComparisons?.filter(comp => comp.length === selectedProj.length);
    const match = sameLength?.filter(comparison => comparison.sort().join(',') === selectedProj.sort().join(','));
    if (match?.length >= 1 ) {
        comparisonMatch.push(match);
    };
    return comparisonMatch;
}
