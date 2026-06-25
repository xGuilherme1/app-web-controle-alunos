import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {
  buildAuthCookie,
  buildLogoutCookie,
  createAuthToken,
  getAuthConfig,
} from './auth/simple-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('inicial')
  getHello(): object {
    return {
      titulo: 'AppWeb com NestJS',
      horaAgora: new Date().toLocaleString('pt-BR'),
    };
  }

  @Get('sobre')
  @Render('_sobre')
  getSobre(): object {
    return {
      titulo: 'Secao de informacoes do sistema web.',
    };
  }

  @Get('login')
  @Render('autenticacao/login')
  login(): object {
    return {
      layout: false,
      erro: null,
    };
  }

  @Post('login')
  @Render('autenticacao/login')
  loginPost(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res,
  ): object | void {
    const config = getAuthConfig();

    if (username === config.username && password === config.password) {
      const token = createAuthToken(username, config.secret);

      res.setHeader('Set-Cookie', buildAuthCookie(token));
      return res.redirect('/');
    }

    return {
      layout: false,
      erro: 'Usuario ou senha invalidos.',
      username,
    };
  }

  @Post('logout')
  logout(@Res() res): void {
    res.setHeader('Set-Cookie', buildLogoutCookie());
    return res.redirect('/login');
  }
}
