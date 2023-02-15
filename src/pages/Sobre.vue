<template>
    <main>
        <section class="container">
            <br>
            <h1>Sobre</h1>
            <br>
            <div class="sobre"  >
               <p>Este é um projeto sem fins lucrativos, afim de aprofundar em estudos da framework VueJs.</p>
               <p>No projeto foi utilizado:</p>
               <ul>
                <li>VueJS como Framework Javascript ;</li>
                <li>Consumo de API do PokeAPI : https://pokeapi.co ;</li>
                <li>Axios para Realizar as Requisições para API ;</li>
                <li>Vue Router para realizar o roteamento das páginas ;</li>
                <li>AWS para Deploy na rede ;</li>
                <li>Diretivas do Vue, como ;
                    <ol>
                        <li>@input;</li>
                        <li>v-if;</li>
                        <li>v-else;</li>
                        <li>v-for</li>
                    </ol>
                </li>
                <li>HTML5/CSS3/JS;</li>
               </ul>
            </div>
        </section>
    </main>
</template>

<script>
export default{
    name:'SobrePage',
    data(){
        return {
            about:''
        }
    }
}
</script>

<style scoped>
  main{
    align-items: center;
    background-color: var(--color-background-home);
    
  }
  section{
    width: 80%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .sobre{
    margin-bottom: 40px;
    color: var(--color-text-dark);
  }
  li,p{
    color: var(--color-text-light);
    font-size: 18px;
  }
</style>