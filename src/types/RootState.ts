import {NfcState} from '../store/nfc';
import {ThemeState} from '../store/theme';

export interface RootState {
  theme: ThemeState;
  nfc: NfcState;
}
