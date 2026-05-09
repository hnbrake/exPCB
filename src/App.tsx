import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { FPGAHub } from './pages/fpga/FPGAHub'
import { FabricPage } from './pages/fpga/FabricPage'
import { SystemBuilderPage } from './pages/fpga/SystemBuilderPage'
import { SoCComparePage } from './pages/fpga/SoCComparePage'
import { MemoryHub } from './pages/memory/MemoryHub'
import { MemoryDeepPage } from './pages/memory/MemoryDeepPage'
import { MemoryMatchPage } from './pages/memory/MemoryMatchPage'
import { CircuitsHub } from './pages/circuits/CircuitsHub'
import { MosfetPage } from './pages/circuits/MosfetPage'
import { CMOSPage } from './pages/circuits/CMOSPage'
import { PassivesPage } from './pages/circuits/PassivesPage'
import { PowerLitePage } from './pages/light/PowerLitePage'
import { ProtocolsLitePage } from './pages/light/ProtocolsLitePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fpga" element={<FPGAHub />} />
        <Route path="/fpga/fabric" element={<FabricPage />} />
        <Route path="/fpga/system" element={<SystemBuilderPage />} />
        <Route path="/fpga/soc" element={<SoCComparePage />} />
        <Route path="/memory" element={<MemoryHub />} />
        <Route path="/memory/deep" element={<MemoryDeepPage />} />
        <Route path="/memory/match" element={<MemoryMatchPage />} />
        <Route path="/circuits" element={<CircuitsHub />} />
        <Route path="/circuits/mosfet" element={<MosfetPage />} />
        <Route path="/circuits/cmos" element={<CMOSPage />} />
        <Route path="/circuits/passives" element={<PassivesPage />} />
        <Route path="/light/power" element={<PowerLitePage />} />
        <Route path="/light/protocols" element={<ProtocolsLitePage />} />
      </Route>
    </Routes>
  )
}
