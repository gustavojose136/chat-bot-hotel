import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import * as fs from 'fs';
import { setTimeout } from "node:timers/promises";

@Injectable()
export class MensagemService {
  constructor(private readonly whatsAppService: WhatsAppService) { }

  private async generateImageFromHtml(htmlContent: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const imagePath = path.resolve(__dirname, '../../output_html.png') as `${string}.png`;
    await page.screenshot({ path: imagePath, fullPage: true });

    await browser.close();
    return imagePath;
  }

  private async generateImageFromFile(filePath: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const absoluteFilePath = `file://${path.resolve(filePath)}`;
    await page.goto(absoluteFilePath, { waitUntil: 'networkidle0' });

    // Espera 1 minuto para a pag carregar
    await setTimeout(60000);

    const imagePath = path.resolve(__dirname, '../../output_file.png') as `${string}.png`;
    await page.screenshot({ path: imagePath, fullPage: true });

    await browser.close();
    return imagePath;
  }

  private async generateImageFromUrl(url: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(url);

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('url');

    //await setTimeout(60000);

    const imagePath = path.resolve(__dirname, '../../output_url.png') as `${string}.png`;
    await page.screenshot({ path: imagePath, fullPage: true });

    await browser.close();
    return imagePath;
  }

  async generateAndSendImageFromHtml(jid: string, htmlContent: string) {
    const imagePath = await this.generateImageFromHtml(htmlContent);
    await this.whatsAppService.sendImage(jid, imagePath, 'ahhhhhhhhhhhhhhhhhhh');
  }

  async generateAndSendImageFromFile(jid: string, filePath: string) {
    const imagePath = await this.generateImageFromFile(filePath);
    await this.whatsAppService.sendImage(jid, imagePath, 'Dashzin pae');
  }

  async generateAndSendImageFromUrl(jid: string, url: string) {
    const imagePath = await this.generateImageFromUrl(url);
    console.log(imagePath);
    await this.whatsAppService.sendImage(jid, imagePath, 'Informe opreacional att');
  }

  async sendCustomMessage(jid: string, message: string) {
    await this.whatsAppService.sendText(jid, message);
  }
}
