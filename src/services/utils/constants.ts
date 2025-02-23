﻿import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret:
    'Ym7AD3OT2kpuIRcVAXCweYhV64B0Oi9ETAO6XRbqB8LDL3tF4bMk9x/59PljcGbP5v38BSzCjD1VTwuO6iWA8uzDVAjw2fMNfcT2/LyRlMOsynblo3envlivtgHnKkZj6HqRrG5ltgwy5NsCQ7WwwYPkldhLTF+wUYAnq28+QnU=',
};
export const IS_PUBLIC_KEY = 'isPublic';
export const AllowAnonymous = () => SetMetadata(IS_PUBLIC_KEY, true);
