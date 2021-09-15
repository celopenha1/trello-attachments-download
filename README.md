
# Trello Download Attachments

Se você utiliza/utilizou o Trello, provavelmente gostaria de baixar todos os anexos de um determinado cartão de uma só vez.

Até então, não há uma ferramenta gratuita para fazer isto.





## Features
- Opção de download (em formato zip) de todos os anexos de um cartão selecionado
- Listagem de cartões baseados em sua nomeclatura
- Listagem de anexos de um cartão selecionado


  
## API Reference

#### Listagem de todos os cartões do seu quadro
```http
  GET /api/cartoes
```
#### Todos os anexos de um cartão específico
```http
  GET /api/cartoes/:cartaoId/attachments
```
#### Download de todos os anexos de um cartão específico
```http
  POST /api/cartoes/:cartaoId/attachments
```

#### Antes de começar, você precisa das seguintes chaves:
- ##### Poderá ser obtidas no site oficial da API do Trello
| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. TRELLO API key |
| `api_token` | `string` | **Required**. TRELLO API token |
| `oauth_token` | `string` | **Required**. trello oauth 1.0 consumer  token |

  
## Autor
- [@Marcelo Penha Filho](https://www.github.com/celopenha)


  

