/** Stable anchor ids for in-page citation links — must match `<Cite id="…" />`. */
export type Citation = {
  id: string
  title: string
  publisher: string
  url: string
}

/** Retrieved date for transparency (ISO). */
export const REFERENCES_RETRIEVED = '2026-05-08'

export const FABRIC_CITATIONS: Citation[] = [
  {
    id: 'cite-ug474',
    title: '7 Series FPGAs Configurable Logic Block (UG474)',
    publisher: 'AMD / Xilinx',
    url: 'https://www.xilinx.com/support/documentation/user_guides/ug474_7Series_CLB.pdf',
  },
  {
    id: 'cite-ug472',
    title: '7 Series FPGAs Clocking Resources (UG472)',
    publisher: 'AMD / Xilinx',
    url: 'https://www.xilinx.com/support/documentation/user_guides/ug472_7Series_Clocking.pdf',
  },
  {
    id: 'cite-serdes-mw',
    title: 'SerDes (serializer/deserializer) — overview',
    publisher: 'MathWorks',
    url: 'https://www.mathworks.com/discovery/serdes.html',
  },
]

export const PROTOCOLS_CITATIONS: Citation[] = [
  {
    id: 'cite-ieee-1149',
    title: 'IEEE Std 1149.1-2013 — Test Access Port and Boundary-Scan Architecture',
    publisher: 'IEEE Standards Association',
    url: 'https://standards.ieee.org/standard/1149_1-2013.html',
  },
  {
    id: 'cite-um10204',
    title: 'I²C-bus specification and user manual (UM10204)',
    publisher: 'NXP Semiconductors',
    url: 'https://www.nxp.com/docs/en/user-guide/UM10204.pdf',
  },
  {
    id: 'cite-mchp-spi',
    title: 'Serial Peripheral Interface (SPI) — peripheral overview',
    publisher: 'Microchip Technology',
    url: 'https://www.microchip.com/en-us/products/microcontrollers/8-bit-mcus/peripherals/communication-connectivity/spi',
  },
]

export const MEMORY_CITATIONS: Citation[] = [
  {
    id: 'cite-jedec-sdram',
    title: 'Synchronous Dynamic Random Access Memory (SDRAM) — SDRAM3.11 listing',
    publisher: 'JEDEC',
    url: 'https://www.jedec.org/standards-documents/docs/sdram-311',
  },
]

export const POWER_CITATIONS: Citation[] = [
  {
    id: 'cite-ti-slva079',
    title: 'Understanding the Terms and Definitions of LDO Voltage Regulators (SLVA079)',
    publisher: 'Texas Instruments',
    url: 'https://www.ti.com/lit/an/slva079',
  },
  {
    id: 'cite-adi-buck',
    title: 'DC-to-DC buck converter tutorial',
    publisher: 'Analog Devices',
    url: 'https://www.analog.com/en/resources/technical-articles/dc-to-dc-buck-converter-tutorial.html',
  },
  {
    id: 'cite-adi-pcb-layout',
    title: 'A Practical Guide to High-Speed Printed-Circuit-Board Layout',
    publisher: 'Analog Devices (Analog Dialogue)',
    url: 'https://www.analog.com/en/analog-dialogue/articles/high-speed-printed-circuit-board-layout.html',
  },
]

export const CMOS_CITATIONS: Citation[] = [
  {
    id: 'cite-aac-cmos',
    title: 'CMOS gate circuitry (Digital Circuits textbook)',
    publisher: 'All About Circuits',
    url: 'https://www.allaboutcircuits.com/textbook/digital/chpt-3/cmos-gate-circuitry/',
  },
  {
    id: 'cite-wiki-cmos',
    title: 'Complementary metal–oxide–semiconductor',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/CMOS',
  },
]
