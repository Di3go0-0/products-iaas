import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);

  constructor(private readonly httpService: HttpService) { }
  async get<T>(url: string): Promise<T> {
    const agent = new https.Agent({
      rejectUnauthorized: false, // Ignorar la validación del certificado SSL
    });

    try {
      const response = await lastValueFrom(
        this.httpService
          .get<T>(url, {
            httpsAgent: agent,
          })
          .pipe(
            catchError((error) => {
              this.logger.error(
                `Error al hacer el GET a ${url}:`,
                error.message,
              );
              if (error.response) {
                this.logger.error(
                  `Detalles del error: ${JSON.stringify(error.response.data)}`,
                );
              }
              throw new HttpException(
                `Error al hacer el GET. ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error al hacer la solicitud GET: ${error.message}`);
      throw new HttpException(
        `Error al hacer el GET. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async post<T>(url: string, body: any): Promise<T> {

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    try {
      const response = await lastValueFrom(
        this.httpService.post<T>(url, body, {
          httpsAgent: agent,
        }),
      );
      return response.data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        `Error al hacer el POST. ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
