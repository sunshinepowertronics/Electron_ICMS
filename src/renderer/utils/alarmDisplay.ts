export type AlarmDisplay = { value: string; color: string }

const NA: AlarmDisplay = { value: 'N/A', color: '#ffffff' }

const FALLBACK: Record<'0' | '1', AlarmDisplay> = {
  '0': { value: 'Inactive', color: '#00ff00' },
  '1': { value: 'Active', color: '#ff4444' },
}

const ALARM_MAPPINGS: Record<string, Record<'0' | '1', AlarmDisplay>> = {
  'Internal Fan 1': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'Internal Fan 2': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'Internal Fan 3': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'External Fan 1': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'External Fan 2': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'External Fan 3': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#d00000' } },
  'Fan 1 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Fan 2 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Fan 3 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Fan 4 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Fan 5 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Fan 6 Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'All Fan Fail': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Room Sensor': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Ambient Sensor': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  Fan: { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'T1 Sensor': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'T2 Sensor': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'Delta T': { '0': { value: 'OK', color: '#00ff00' }, '1': { value: 'Fail', color: '#ff4444' } },
  'High Temp Alarm': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'High', color: '#ff4444' } },
  'Low Temp Alarm': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'Low', color: '#ff9900' } },
  HCT: { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'High', color: '#ff4444' } },
  Smoke: { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff4444' } },
  'Smoke Alarm': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff4444' } },
  Door: { '0': { value: 'Closed', color: '#00ff00' }, '1': { value: 'Open', color: '#ff4444' } },
  'Door Open': { '0': { value: 'Closed', color: '#00ff00' }, '1': { value: 'Open', color: '#ff4444' } },
  'Usys High Alarm': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'High', color: '#ff4444' } },
  'Usys Low Alarm': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'Low', color: '#ff9900' } },
  'Machine Status': { '0': { value: 'Off', color: '#888888' }, '1': { value: 'On', color: '#00ff00' } },
  'Fan On': { '0': { value: 'Off', color: '#888888' }, '1': { value: 'On', color: '#00ff00' } },
  'Internal Fan 1 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Internal Fan 2 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'External Fan 1 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'External Fan 2 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 1 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 2 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 3 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 4 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 5 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'Fan 6 Status': { '0': { value: 'Stopped', color: '#ff0000' }, '1': { value: 'Running', color: '#00ff00' } },
  'DIN 1': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 2': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 3': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 4': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 5': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 6': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 7': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  'DIN 8': { '0': { value: 'Inactive', color: '#00ff00' }, '1': { value: 'Active', color: '#ff0000' } },
  Buzzer: { '0': { value: 'Off', color: '#888888' }, '1': { value: 'On', color: '#ff4444' } },
  'Smoke/Door': { '0': { value: 'Closed', color: '#888888' }, '1': { value: 'Open', color: '#ff4444' } },
  'HCT/HRT': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'High', color: '#ff4444' } },
  'Usys Low': { '0': { value: 'Normal', color: '#00ff00' }, '1': { value: 'Low', color: '#ff9900' } },
}

export const INTERNAL_EXTERNAL_FAN_NAMES = new Set([
  'Internal Fan 1',
  'Internal Fan 2',
  'Internal Fan 3',
  'External Fan 1',
  'External Fan 2',
  'External Fan 3',
])

export function getAlarmMapping(paramName: string, bitValue: 0 | 1): AlarmDisplay {
  const row = ALARM_MAPPINGS[paramName]
  const k = String(bitValue) as '0' | '1'
  if (row?.[k]) return row[k]
  return FALLBACK[k] ?? NA
}

export function getFanStatusDisplay(fanOn: 0 | 1, fanStatus: 0 | 1): AlarmDisplay {
  if (fanOn === 0) return { value: 'Stopped', color: '#888888' }
  if (fanStatus === 0) return { value: 'Running', color: '#00ff00' }
  if (fanStatus === 1) return { value: 'Fail', color: '#ff4444' }
  return NA
}

export function getBitIn24(b0: number, b1: number, b2: number, bitPosition: number): 0 | 1 {
  if (bitPosition < 8) return ((b0 >> bitPosition) & 1) as 0 | 1
  if (bitPosition < 16) return ((b1 >> (bitPosition - 8)) & 1) as 0 | 1
  return ((b2 >> (bitPosition - 16)) & 1) as 0 | 1
}

export function parseAlarmBit(b0: number, b1: number, b2: number, bitPosition: number, paramName: string): AlarmDisplay {
  try {
    const bit = getBitIn24(b0, b1, b2, bitPosition)
    return getAlarmMapping(paramName, bit)
  } catch {
    return NA
  }
}

export function dualBitHighLowNormal(valA: 0 | 1, valB: 0 | 1): AlarmDisplay {
  if (valA === 1 && valB === 0) return { value: 'High', color: '#ff4444' }
  if (valA === 0 && valB === 1) return { value: 'Low', color: '#ff9900' }
  if (valA === 0 && valB === 0) return { value: 'Normal', color: '#00ff00' }
  return NA
}

export function internalExternalFanDisplay(failBit: 0 | 1, runningBit: 0 | 1): AlarmDisplay {
  if (failBit === 1) return { value: 'Fail', color: '#d00000' }
  if (failBit === 0 && runningBit === 1) return { value: 'Running', color: '#00ff00' }
  if (failBit === 0 && runningBit === 0) return { value: 'Stopped', color: '#d00000' }
  return NA
}
