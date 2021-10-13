
# Trello Download Attachments

Se você utiliza/utilizou o Trello, provavelmente gostaria de baixar todos os anexos de um determinado cartão de uma só vez.
Óbvio, você vai precisar da sua API KEY/TOKEN. E provavelmente seus cartões terão que seguir um padrão de nomeclatura para esta estrutura funcionar ;p


## Features
- Opção de download (em formato zip) de todos os anexos de um cartão selecionado
- Listagem de cartões baseados em sua nomeclatura
- Listagem de anexos de um cartão selecionado.
  
## API Reference

```http
  GET /api/cartoes
```
```http
  GET /api/cartoes/:cartaoId/attachments
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. TRELLO API key |
| `api_token` | `string` | **Required**. TRELLO API token |
| `oauth_token` | `string` | **Required**. trello oauth 1.0 consumer  token |

  
## Autor
- [@Marcelo Penha Filho](https://www.github.com/celopenha)


  

