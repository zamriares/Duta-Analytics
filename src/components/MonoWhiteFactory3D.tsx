import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Activity, Cpu } from "lucide-react";

export function MonoWhiteFactory3D() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "460px",
        background: "linear-gradient(180deg, #ffffff 0%, #f4f5f7 100%)",
        borderRadius: "8px",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle 3D Isometric Floor Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(200, 202, 210, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 202, 210, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(800px) rotateX(55deg) rotateZ(-25deg) scale(1.6)",
          transformOrigin: "center center",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {/* Floating Monowhite 3D Floor Layout Header Badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          padding: "6px 14px",
          borderRadius: "4px",
          border: "0.8px solid var(--border-subtle)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgb(0, 180, 100)",
            boxShadow: "0 0 8px rgba(0, 180, 100, 0.6)",
          }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-primary)" }}>
          MONOWHITE OPEN PRODUCTION FLOOR &bull; NO WALLS
        </span>
      </div>

      {/* 3D Isometric Open Production Floor Container (No Walls) */}
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "850px",
          height: "360px",
          transform: "perspective(1000px) rotateX(42deg) rotateZ(-18deg) scale(0.9)",
          transformStyle: "preserve-3d",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "36px",
          padding: "20px",
        }}
      >
        {/* Machine 1: CNC Machining Center 01 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "6px",
            border: "1px solid #e2e4e9",
            padding: "20px",
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800, color: "#1a1a1a" }}>
              CNC #01
            </span>
            <CheckCircle2 size={14} color="#00b464" />
          </div>
          <div style={{ height: "48px", background: "#f8f9fa", borderRadius: "4px", margin: "12px 0", border: "1px solid #eeeeee", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Cpu size={24} color="#5a5f6c" />
          </div>
          <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8c919e", display: "flex", justifyContent: "space-between" }}>
            <span>ACTIVE</span>
            <span style={{ fontWeight: 700, color: "#1a1a1a" }}>94.2% OEE</span>
          </div>
        </motion.div>

        {/* Machine 2: CNC Machining Center 02 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "6px",
            border: "1px solid #e2e4e9",
            padding: "20px",
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800, color: "#1a1a1a" }}>
              CNC #02
            </span>
            <AlertTriangle size={14} color="#e6a100" />
          </div>
          <div style={{ height: "48px", background: "#f8f9fa", borderRadius: "4px", margin: "12px 0", border: "1px solid #eeeeee", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Cpu size={24} color="#e6a100" />
          </div>
          <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8c919e", display: "flex", justifyContent: "space-between" }}>
            <span>WARN</span>
            <span style={{ fontWeight: 700, color: "#e6a100" }}>78.5% OEE</span>
          </div>
        </motion.div>

        {/* Machine 3: 6-Axis Robot Cell A1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "6px",
            border: "1px solid #e2e4e9",
            padding: "20px",
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800, color: "#1a1a1a" }}>
              ROBOT A1
            </span>
            <CheckCircle2 size={14} color="#00b464" />
          </div>
          <div style={{ height: "48px", background: "#f8f9fa", borderRadius: "4px", margin: "12px 0", border: "1px solid #eeeeee", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity size={24} color="#0066ff" />
          </div>
          <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8c919e", display: "flex", justifyContent: "space-between" }}>
            <span>ACTIVE</span>
            <span style={{ fontWeight: 700, color: "#1a1a1a" }}>98.4% OEE</span>
          </div>
        </motion.div>

        {/* Machine 4: Palletizing Robot A2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "6px",
            border: "1px solid #e2e4e9",
            padding: "20px",
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800, color: "#1a1a1a" }}>
              ROBOT A2
            </span>
            <CheckCircle2 size={14} color="#00b464" />
          </div>
          <div style={{ height: "48px", background: "#f8f9fa", borderRadius: "4px", margin: "12px 0", border: "1px solid #eeeeee", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity size={24} color="#00b4d8" />
          </div>
          <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8c919e", display: "flex", justifyContent: "space-between" }}>
            <span>ACTIVE</span>
            <span style={{ fontWeight: 700, color: "#1a1a1a" }}>96.1% OEE</span>
          </div>
        </motion.div>

        {/* Machine 5: Automated Conveyor Line 02 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "relative",
            gridColumn: "span 2",
            background: "#ffffff",
            borderRadius: "6px",
            border: "1px solid #e2e4e9",
            padding: "20px",
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800, color: "#1a1a1a" }}>
              LINE-02 AUTOMATED CONVEYOR
            </span>
            <CheckCircle2 size={14} color="#00b464" />
          </div>
          <div style={{ height: "48px", background: "#f8f9fa", borderRadius: "4px", margin: "12px 0", border: "1px solid #eeeeee", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ width: "30%", height: "8px", background: "#e2e4e9", borderRadius: "4px" }} />
            <div style={{ width: "30%", height: "8px", background: "#0066ff", borderRadius: "4px" }} />
            <div style={{ width: "30%", height: "8px", background: "#e2e4e9", borderRadius: "4px" }} />
          </div>
          <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8c919e", display: "flex", justifyContent: "space-between" }}>
            <span>SYNCHRONIZED CONVEYOR</span>
            <span style={{ fontWeight: 700, color: "#1a1a1a" }}>5,400 UNITS/SHIFT</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
