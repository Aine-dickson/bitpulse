// The path a build takes — a real sequence, each stage gating the next.

export interface Step {
  n: string
  stage: string
  title: string
  body: string
}

export const process: Step[] = [
  {
    n: '01',
    stage: 'SCOPE',
    title: 'Acquire',
    body: 'We pin the problem, constraints and success signal before anyone touches a schematic.',
  },
  {
    n: '02',
    stage: 'DESIGN',
    title: 'Route',
    body: 'Architecture, board and protocol are drawn, reviewed against the spec, then priced.',
  },
  {
    n: '03',
    stage: 'BUILD',
    title: 'Fabricate',
    body: 'Firmware, hardware and services built in demoable slices, with a test rig at every step.',
  },
  {
    n: '04',
    stage: 'SUSTAIN',
    title: 'Monitor',
    body: 'We instrument, hand over, and keep the system observable long after switch-on.',
  },
]
