import { NewsController } from './news.controller';

describe('News Controller', () => {
  let controller: NewsController;

  const newsServiceMock = {
    listAllNews: jest.fn(),
    listSpecificNews: jest.fn(),
    findById: jest.fn(),
    createNews: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
  };

  const mockImagem = {
    buffer: Buffer.from('fake-image'),
    originalname: 'fake-image.jpg',
    mimetype: 'image/jpeg',
  } as Express.Multer.File;

  const mockUserId = 1;

  const mockNewsDto = {
    editoria: 'Economia',
    url: 'economia/china-nova-retaliacao-tarifas-estados-unidos',
    titulo:
      'China retalia os EUA, eleva tarifas para 125%, mas diz que disputa se tornará ‘piada’ histórica',
    subtitulo:
      'China diz que guerra se tornou ‘um jogo de números, que não tem nenhum significado econômico prático’, e sinalizou que não fará novos aumentos, mesmo que os Estados Unidos voltem a subir as taxas',
    data_hora_publicacao: '2025-04-11 16:44:00',
    conteudo:
      '<p>A <a href="https://www.estadao.com.br/tudo-sobre/china-asia/?srsltid=AfmBOor1Cfrei_s80QNDtk3KPwvs5lJPBgFSUq3QA8VwCMFZigH7FNs8" target="_blank"><b>China</b></a> anunciou nesta sexta-feira que aumentará as tarifas sobre os produtos norte-americanos de 84% para 125% a partir deste sábado, 12. Washington e Pequim vêm subindo o tom de sua guerra comercial ao aumentarem as tarifas entre si, mesmo depois que o presidente dos EUA, <a href="https://www.estadao.com.br/tudo-sobre/donald-trump/?srsltid=AfmBOopkVngEZd_fLs30gyjl2Xcsm6KEm7amcIm5RaMOL6zqli3BLy7n" target="_blank"><b>Donald Trump</b></a>, suspendeu temporariamente as cobranças retaliatórias sobre outros países.</p><p> A China havia dito que combateria as tarifas dos EUA com suas próprias contramedidas e chamou as ações de Trump de “assédio econômico”, levando o líder republicano a retaliar aumentando substancialmente as tarifas nesta semana.</p><p>As <a href="https://www.estadao.com.br/economia/tarifa-china-reciprocas-eua/?srsltid=AfmBOopFjYGG6OxlTumxR1y9QoZc4j5DJIiAz1milV9yqlfGzRxeJ5ml" target="_blank"><b>tarifas totais de Trump sobre Pequim são de 145%</b></a>. Ontem, ele disse que, quando ele anunciou na quarta-feira, 9,  que o gigante asiático enfrentaria tarifas de 125%, não havia incluído as tarifas de 20% anunciadas em fevereiro e março.</p><p><div>                            <figure><img                                    loading="lazy"                                    class="size-full"                                    src="https://www.estadao.com.br/resizer/v2/LXVZ7DQIOZEEHDX5NOAYSR5PCA.jpg?quality=80&auth=f3286120503bf42b9c65bf076baa9ff9448f1ddf9864109ca5d59b4276df205d&width=380"                                    alt="Saul Loeb/AFP" />                                <figcaption>Os presidentes dos Estados Unidos, Donald Trump (E) e da China, Xi Jinping Foto: Saul Loeb/AFP</figcaption>                            </figure>                        </div></p><p>A China sinalizou também que não fará novos aumentos, mesmo que os EUA voltem a subir as tarifas.  “Dado que, com este nível de tarifas, os produtos dos EUA exportados para a China não têm mais chance de serem aceitos no mercado”, se Washington continuar a aumentar suas tarifas, “a China vai ignorar isso”, disse a Comissão Tarifária do governo em um comunicado divulgado pelo Ministério das Finanças.</p><p>As medidas de Trump levaram economistas e empresários a alertar sobre uma possível recessão, e alguns dos principais parceiros comerciais de Washington a retaliar com seus próprios impostos de importação, antes da pausa na aplicação. No entanto, Trump e a China continuaram a aumentar as tarifas em um processo mútuo.</p><p>“O aumento anormalmente alto das tarifas dos Estados Unidos sobre a China tornou-se um jogo de números, que não tem nenhum significado econômico prático, e se tornará uma piada na história da economia mundial”, disse um porta-voz do Ministério das Finanças chinês ao anunciar as novas tarifas. “Entretanto, se os Estados Unidos insistirem em continuar a infringir substancialmente os interesses da China, a China revidará com determinação e lutará até o fim”.</p><p>O Ministério do Comércio da China disse que apresentaria outra queixa à <a href="https://www.estadao.com.br/tudo-sobre/omc-organizacao-mundial-do-comercio/?srsltid=AfmBOopSxnDfCwGLxHIMxPz48imk2a3uxv4V9RFwd7s6bqe2xdvw4XQD" target="_blank"><b>Organização Mundial do Comércio</b></a> contra as tarifas de Washington.<div class="lista-numerada-noticia list-numbered modulo-noticia"><h3 class="lista-numerada-title numbered-title"></h3><ul class="indice-ranking"><li><a href="https://www.estadao.com.br/economia/the-economist-politica-comercial-trump-danos-duradouros/" title="The Economist: A política comercial incoerente de Trump causará danos duradouros à economia mundial"><figure class="image-ranking"><div class="pos ">1</div></figure><div class="ln-right"><div class="ln-right-title title-ranking">The Economist: A política comercial incoerente de Trump causará danos duradouros à economia mundial</div><p class="description-ranking"></div></a></li><li><a href="https://www.estadao.com.br/economia/politica-tarifaria-trump-efeito-colateral-entrevista/" title="‘Política de Trump é meio desastrada, mas talvez tenha efeito colateral positivo’, diz Samuel Pessôa"><figure class="image-ranking"><div class="pos ">2</div></figure><div class="ln-right"><div class="ln-right-title title-ranking">‘Política de Trump é meio desastrada, mas talvez tenha efeito colateral positivo’, diz Samuel Pessôa</div><p class="description-ranking"></div></a></li><li><a href="https://www.estadao.com.br/economia/por-que-venda-em-massa-titulos-eua-fez-trump-recuar-tarifas/" title="Entenda por que a venda em massa de títulos dos EUA fez Trump recuar nas tarifas"><figure class="image-ranking"><div class="pos ">3</div></figure><div class="ln-right"><div class="ln-right-title title-ranking">Entenda por que a venda em massa de títulos dos EUA fez Trump recuar nas tarifas</div><p class="description-ranking"></div></a></li></ul></div></p><p>Na semana passada, Pequim suspendeu as importações de sorgo, aves e farinha de ossos de algumas empresas norte-americanas e aumentou os controles de exportação de minerais de terras raras essenciais para várias tecnologias, além de colocar algumas dezenas de empresas norte-americanas em listas que impediriam as empresas chinesas de vender-lhes produtos de uso duplo.</p><p>Considerando o tamanho das duas economias, as maiores do mundo, os especialistas temem um caos econômico global.</p><p>O diretor-geral da OMC, Ngozi Okonjo-Iweala, disse no início desta semana que uma guerra comercial entre Washington e Pequim poderia “prejudicar gravemente as perspectivas econômicas globais”.</p>',
  };

  beforeEach(() => {
    controller = new NewsController(newsServiceMock as any);
  });

  it('should find all users', async () => {
    const paginationDto = {
      page: 1,
      limit: 10,
    };

    await controller.getNews(paginationDto);
    expect(newsServiceMock.listAllNews).toHaveBeenCalled();
  });

  it('should create a new news', async () => {
    await controller.createNews(mockNewsDto, { imagem: [mockImagem] });
    expect(newsServiceMock.createNews).toHaveBeenCalled();
  });

  it('should update a new news', async () => {
    await controller.updateNews(mockUserId, mockNewsDto, { imagem: [mockImagem] });
    expect(newsServiceMock.updateNews).toHaveBeenCalled();
  });

  it('should delete a new news', async () => {
    await controller.deleteNews(mockUserId);
    expect(newsServiceMock.deleteNews).toHaveBeenCalled();
  });

  it('should find a news by id', async () => {
    await controller.findNewsById(mockUserId);
    expect(newsServiceMock.findById).toHaveBeenCalled();
  });
  it('should find a news by editoria and url', async () => {
    await controller.findExpecificNews(mockNewsDto.editoria, mockNewsDto.url);
    expect(newsServiceMock.listSpecificNews).toHaveBeenCalled();
  });
});
