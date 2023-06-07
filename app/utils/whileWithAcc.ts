const whileWithAcc = async function(
    acc: any = {},
    negativeCondition: (...args: any[]) => boolean,
    processData: (index: number, initialAcc: any) => Promise<{ nextData: any, nextAcc: any }>,
    data?: any,
    iteration?: number
  ) {
    const guardedIteration = typeof iteration !== 'undefined' ? iteration + 1 : 0;
    if (data && negativeCondition(data, acc)) {
      return acc;
    } else {
      const { nextData, nextAcc } = await processData(guardedIteration, acc);
      return whileWithAcc(nextAcc, negativeCondition, processData, nextData, guardedIteration);
    }
  }

export default whileWithAcc;
