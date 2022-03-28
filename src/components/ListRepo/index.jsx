import { useState } from 'react'
import { ContainerBody, Form, ContainerRepo, ContainerImage, Repo } from "./styles";
import { FiTrash } from 'react-icons/fi'
import { api } from '../../services/api'
import { toast } from 'react-toastify';



export function ListRepo() {

  const [input, setInput] = useState('')
  const [repositories, setRepositories] = useState([])



  async function handleAddRepository(e) {
    e.preventDefault();

    //description
    //full_name
    //owner: avatar_url

    try {
      const response = await api.get(`repos/${input}`)
      const data = response.data;
  

      const isExists = repositories.find(repository => repository.name === data.name)

      if(isExists){
        toast.warn('Este repositório já foi adicionado')

        return;
      }

      
      setRepositories([...repositories, data])
      toast.success('Repositório adicionado " com sucesso')
      
      console.log(data)
    } catch (error) {
     toast.error('Repositório não existe')
     console.log(error)
    }

  }

  function handleDeleteRepository(id){
    const repositoryDeleted = repositories.filter((data) =>{
      return data.name !== id
    })

    toast.success('Repositório deletado com sucesso')
    setRepositories(repositoryDeleted)
  }

  return (
    <ContainerBody>
      <Form onSubmit={handleAddRepository}>
        <input type="text" placeholder="Exemplo: usuario/repositorio" value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </Form>

      <ContainerRepo>
        {repositories.map(repository => (
          <Repo key={repository.full_name}>
            <ContainerImage>
              <img src={repository.owner.avatar_url} alt="" />
            </ContainerImage>
            <span>
            <h1>{repository.full_name}</h1>
            <FiTrash color="#C53E00" fontSize="1.5rem" cursor={"pointer"} onClick={()=> handleDeleteRepository(repository.name)}/>

            </span>
            <p>{repository.description}</p>
          </Repo>
        ))}


      </ContainerRepo>
    </ContainerBody>
  );
}
