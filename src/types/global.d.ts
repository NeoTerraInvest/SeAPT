/**
 * DefaultStyled exists for `_Error.module.scss`
 */
import { linkMap } from './mapping';
export interface DefaultStyled {
  debug: string;
  container: string;
  element: string;
}

export type linkKey = keyof typeof linkMap;

export type translateKey = 'EN' | 'CN' | 'JP' | 'KR' | 'VT';
