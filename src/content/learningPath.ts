/** One suggested read order — bottom-of-page trail links here. */
export type LearningStep = {
  path: string
  title: string
  subtitle: string
}

export const LEARNING_PATH: LearningStep[] = [
  { path: '/', title: 'Home', subtitle: 'Map of the site' },
  { path: '/fpga', title: 'FPGA overview', subtitle: 'Why fabric exists' },
  { path: '/fpga/fabric', title: 'Inside the fabric', subtitle: 'Programmable logic mesh' },
  { path: '/fpga/system', title: 'Board bring-up', subtitle: 'Clock → flash → chip' },
  { path: '/fpga/soc', title: 'SoC vs FPGA vs MPU', subtitle: 'Integrate · reconfigure · program' },
  { path: '/memory', title: 'Memory overview', subtitle: 'Volatile vs NV' },
  { path: '/memory/deep', title: 'Memory technologies', subtitle: 'Compare cells' },
  { path: '/memory/match', title: 'Match lab', subtitle: 'Roles on a board' },
  { path: '/circuits', title: 'Circuits overview', subtitle: 'Devices & passives' },
  { path: '/circuits/mosfet', title: 'MOSFET', subtitle: 'Field-controlled switch' },
  { path: '/circuits/cmos', title: 'CMOS', subtitle: 'Complementary logic' },
  { path: '/circuits/passives', title: 'R · L · C', subtitle: 'Filters & energy' },
  { path: '/light/power', title: 'Power path', subtitle: 'LDO vs buck' },
  { path: '/light/protocols', title: 'Protocols', subtitle: 'SPI · I²C · JTAG debug port' },
]

export function learningStepIndex(pathname: string): number {
  return LEARNING_PATH.findIndex((s) => s.path === pathname)
}
