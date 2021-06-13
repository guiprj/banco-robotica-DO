$("#btnAdmin").click(function(){
    $(".admin").fadeToggle();
  });

  $("#btn5ano").click(function(){
    $(".Alunos5Ano").fadeToggle();
  });

  $("#btn6ano").click(function(){
    $(".Alunos6Ano").fadeToggle();
  });

  $("#btn7ano").click(function(){
    $(".Alunos7Ano").fadeToggle();
  });

  $("#btn8ano").click(function(){
    $(".Alunos8Ano").fadeToggle();
  });

  $("#btn9ano").click(function(){
    $(".Alunos9Ano").fadeToggle();
  });

  $(".btnMsgClose").click(function(){
    $(".modalBalanceError").hide();
  });
  
  $(".btnMsgClose").click(function(){
    $(".modalBalanceSuccess").hide();
  });

  function confirmDel(event, form){
    event.preventDefault();

    let decision = confirm('Quer mesmo excluir esse pedido?')
    if(decision){
      form.submit();
    }
  }
console.log("Oii")
  function confirmDelUser(event, form){
    event.preventDefault();

    let decision = confirm('Quer mesmo excluir esse usuário?')
    if(decision){
      form.submit();
    }
  }

  function confirmDelProduct(event, form){
    event.preventDefault();

    let decision = confirm('Quer mesmo excluir esse produto?')
    if(decision){
      form.submit();
    }
  }

  function confirmSuccess(event, form){
    event.preventDefault();

    let decision = confirm('Quer mesmo confirmar esse pedido?')
    if(decision){
      form.submit();
    }
  }
  confirmDelProduct
  