export function weiToEth(wei: string): string {
  const weiValue = BigInt(wei);
  const ethValue = weiValue / BigInt(10 ** 18);
  return ethValue.toString();
}
