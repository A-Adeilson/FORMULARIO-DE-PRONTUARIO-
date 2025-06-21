import React, { useState } from 'react';
import { Copy, Download, RotateCcw } from 'lucide-react';

export default function AnamneseForm() {
  const [formData, setFormData] = useState({
    // HMA
    tempoSintomas: '',
    sintomasPrincipais: [],
    sintomasNegados: [],
    fatoresAssociados: '',
    
    // APP
    patologias: '',
    
    // MUC
    medicacoes: '',
    
    // Alergias
    alergias: '',
    
    // Exame Físico
    estadoGeral: 'BEG, CORADO, HIDRATADO, ACIANÓTICO, AFEBRIL, EUPNEICO, ECG 15',
    estadoGeralAlterado: '',
    estadoGeralTipo: 'normal',
    
    aparelhoRespiratorio: 'MVF SEM RUÍDOS ADVENTÍCIOS, SEM REBAIXAMENTO DE FÚRCULA OU USO DE MUSCULATURA ACESSÓRIA',
    aparelhoRespiratorioAlterado: '',
    aparelhoRespiratorioTipo: 'normal',
    
    aparelhoCardiovascular: 'BRNF 2T SEM SOPROS, PERFUSÃO CAPILAR < 3 SEGUNDOS, PULSOS CHEIOS E SIMÉTRICOS',
    aparelhoCardiovascularAlterado: '',
    aparelhoCardiovascularTipo: 'normal',
    
    aparelhoGastrointestinal: 'ABDOME LIVRE, SEM DOR À PALPAÇÃO, SEM VISCEROMEGALIAS, SEM SINAIS DE PERITONITE, NORMOTIMPANICO, RUÍDOS HIDROAÉREOS PRESENTES',
    aparelhoGastrointestinalAlterado: '',
    aparelhoGastrointestinalTipo: 'normal',
    
    outrosAparelhos: '',
    outrosAparelhosAlterado: '',
    outrosAparelhosTipo: 'normal',
    
    // HD
    hipoteseDiagnostica: '',
    
    // Conduta
    conduta: 'PRESCREVO SINTOMÁTICOS\nORIENTAÇÕES\nORIENTO SINAIS DE ALARME\nRETORNO SE NECESSÁRIO'
  });

  const sintomasPorSistema = {
    respiratorio: [
      'FEBRE NÃO TERMOMETRADA', 'FEBRE DE XX GRAUS', 'CEFALEIA', 'CEFALEIA FRONTAL',
      'TOSSE SECA', 'TOSSE SECRETIVA', 'TOSSE COM PIORA À NOITE', 'DISFAGIA',
      'ODINOFAGIA', 'OTALGIA À DIREITA', 'OTALGIA À ESQUERDA', 'CORIZA',
      'SECREÇÃO AMARELO ESVERDEADA', 'DOR NO CORPO', 'DOR NAS COSTAS',
      'MAL ESTAR', 'DISPNEIA', 'SIBILÂNCIA', 'DOR TORÁCICA VENTILATÓRIO-DEPENDENTE'
    ],
    gastrointestinal: [
      'NÁUSEA', 'VÔMITO', 'DOR ABDOMINAL', 'EPIGASTRALGIA', 'DIARREIA',
      'MAL ESTAR', 'INAPETÊNCIA', 'DISÚRIA', 'POLACIÚRIA', 'DOR SUPRAPÚBICA',
      'CONSTIPAÇÃO', 'DISTENSÃO ABDOMINAL', 'PIROSE', 'REFLUXO GASTROESOFÁGICO',
      'PLENITUDE PÓS-PRANDIAL', 'HEMATÊMESE', 'HEMATOQUEZIA', 'MELENA'
    ],
    musculoesqueletico: [
      'DOR LOMBAR À DIREITA', 'DOR LOMBAR À ESQUERDA', 'DOR LOMBAR',
      'DOR EM REGIÃO DE XXX', 'PIORA COM MOVIMENTAÇÃO', 'NÃO ALTERA COM MOVIMENTAÇÃO',
      'REFERE TRABALHAR PEGANDO PESO', 'REFERE TER FEITO MOVIMENTO REPETITIVO',
      'REFERE FICAR MUITO TEMPO SENTADO'
    ],
    cardiovascular: [
      'DOR TORÁCICA À DIREITA', 'DOR TORÁCICA À ESQUERDA', 'IRRADIANDO PARA MSE',
      'IRRADIANDO PARA MSD', 'IRRADIANDO PARA DORSO', 'PIORA COM ESFORÇO',
      'PIORA COM DEAMBULAÇÃO', 'SEM RELAÇÃO COM ESFORÇO', 'EDEMA DE MMI',
      'EDEMA DE MID/E', 'SÍNCOPE', 'DISPNEIA AOS ESFORÇOS', 'ORTOPNÉIA', 'PALPITAÇÃO'
    ],
    neurologico: [
      'CEFALEIA HOLOCRANIANA', 'CEFALEIA FRONTAL', 'CEFALEIA HEMICRANIANA À DIREITA',
      'CEFALEIA HEMICRANIANA À ESQUERDA', 'FOTOFOBIA', 'FONOFOBIA', 'VERTIGEM',
      'TURVAÇÃO VISUAL', 'DESMAIO', 'CONVULSÃO', 'SÍNCOPE',
      'ALTERAÇÃO DO NÍVEL DE CONSCIÊNCIA', 'ALTERAÇÃO DE COMPORTAMENTO',
      'PROSTRAÇÃO', 'CONFUSÃO MENTAL', 'AMNÉSIA', 'DISARTRIA', 'AFASIA',
      'HEMIPARESIA À DIREITA', 'HEMIPARESIA À ESQUERDA', 'ATAXIA'
    ]
  };

  const sintomasNegadosComuns = [
    'NEGA FEBRE', 'NEGA VÔMITOS', 'NEGA DIARREIA', 'NEGA DISPNEIA', 
    'NEGA DOR TORÁCICA', 'NEGA PALPITAÇÕES', 'NEGA CEFALEIA'
  ];

  const toggleSintoma = (sintoma, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(sintoma) 
        ? prev[type].filter(s => s !== sintoma)
        : [...prev[type], sintoma]
    }));
  };

  const generateAnamnese = () => {
    const hma = `PACIENTE ${formData.tempoSintomas ? `A ${formData.tempoSintomas.toUpperCase()} ` : ''}APRESENTOU ${formData.sintomasPrincipais.join(', ')}${formData.sintomasNegados.length > 0 ? '. ' + formData.sintomasNegados.join(', ') : ''}${formData.fatoresAssociados ? '. ' + formData.fatoresAssociados.toUpperCase() : ''}.`;

    const getExameFisico = (tipo, normal, alterado) => {
      return tipo === 'normal' ? normal : alterado.toUpperCase();
    };

    return `HMA (HISTÓRIA DA MOLÉSTIA ATUAL):

${hma}

APP: ${formData.patologias.toUpperCase() || 'NEGA PATOLOGIAS'}
MUC: ${formData.medicacoes.toUpperCase() || 'NEGA USO DE MEDICAÇÕES CONTÍNUAS'}
ALERGIAS: ${formData.alergias.toUpperCase() || 'NEGA ALERGIAS A MEDICAMENTOS E ALIMENTOS'}


EXAME FÍSICO:

${getExameFisico(formData.estadoGeralTipo, formData.estadoGeral, formData.estadoGeralAlterado)}
AR: ${getExameFisico(formData.aparelhoRespiratorioTipo, formData.aparelhoRespiratorio, formData.aparelhoRespiratorioAlterado)}
ACV: ${getExameFisico(formData.aparelhoCardiovascularTipo, formData.aparelhoCardiovascular, formData.aparelhoCardiovascularAlterado)}
AGI: ${getExameFisico(formData.aparelhoGastrointestinalTipo, formData.aparelhoGastrointestinal, formData.aparelhoGastrointestinalAlterado)}${formData.outrosAparelhosTipo === 'normal' && formData.outrosAparelhos ? `\n${formData.outrosAparelhos.toUpperCase()}` : formData.outrosAparelhosTipo === 'alterado' && formData.outrosAparelhosAlterado ? `\n${formData.outrosAparelhosAlterado.toUpperCase()}` : ''}

HD (HIPÓTESE DIAGNÓSTICA):
${formData.hipoteseDiagnostica.toUpperCase()}

CD (CONDUTA):
${formData.conduta.toUpperCase()}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateAnamnese());
    alert('Anamnese copiada para a área de transferência!');
  };

  const downloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generateAnamnese()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'anamnese.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setFormData({
      tempoSintomas: '',
      sintomasPrincipais: [],
      sintomasNegados: [],
      fatoresAssociados: '',
      patologias: '',
      medicacoes: '',
      alergias: '',
      estadoGeral: 'BEG, CORADO, HIDRATADO, ACIANÓTICO, AFEBRIL, EUPNEICO, ECG 15',
      estadoGeralAlterado: '',
      estadoGeralTipo: 'normal',
      aparelhoRespiratorio: 'MVF SEM RUÍDOS ADVENTÍCIOS, SEM REBAIXAMENTO DE FÚRCULA OU USO DE MUSCULATURA ACESSÓRIA',
      aparelhoRespiratorioAlterado: '',
      aparelhoRespiratorioTipo: 'normal',
      aparelhoCardiovascular: 'BRNF 2T SEM SOPROS, PERFUSÃO CAPILAR < 3 SEGUNDOS, PULSOS CHEIOS E SIMÉTRICOS',
      aparelhoCardiovascularAlterado: '',
      aparelhoCardiovascularTipo: 'normal',
      aparelhoGastrointestinal: 'ABDOME LIVRE, SEM DOR À PALPAÇÃO, SEM VISCEROMEGALIAS, SEM SINAIS DE PERITONITE, NORMOTIMPANICO, RUÍDOS HIDROAÉREOS PRESENTES',
      aparelhoGastrointestinalAlterado: '',
      aparelhoGastrointestinalTipo: 'normal',
      outrosAparelhos: '',
      outrosAparelhosAlterado: '',
      outrosAparelhosTipo: 'normal',
      hipoteseDiagnostica: '',
      conduta: 'PRESCREVO SINTOMÁTICOS\nORIENTAÇÕES\nORIENTO SINAIS DE ALARME\nRETORNO SE NECESSÁRIO'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Formulário de Anamnese</h1>
        <p className="text-gray-600">Preencha os campos para gerar uma anamnese formatada</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-6">
          {/* HMA */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">HMA - História da Moléstia Atual</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tempo dos sintomas</label>
              <input
                type="text"
                placeholder="Ex: 3 dias, 1 semana"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.tempoSintomas}
                onChange={(e) => setFormData(prev => ({...prev, tempoSintomas: e.target.value}))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sintomas Principais</label>
              
              {Object.entries(sintomasPorSistema).map(([sistema, sintomas]) => (
                <div key={sistema} className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 capitalize">
                    {sistema === 'respiratorio' && '🫁 Sistema Respiratório'}
                    {sistema === 'gastrointestinal' && '🫄 Sistema Gastrointestinal'}
                    {sistema === 'musculoesqueletico' && '🦴 Sistema Musculoesquelético'}
                    {sistema === 'cardiovascular' && '❤️ Sistema Cardiovascular'}
                    {sistema === 'neurologico' && '🧠 Sistema Neurológico'}
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {sintomas.map(sintoma => (
                      <button
                        key={sintoma}
                        onClick={() => toggleSintoma(sintoma, 'sintomasPrincipais')}
                        className={`p-2 text-xs rounded border text-left ${
                          formData.sintomasPrincipais.includes(sintoma)
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {sintoma}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sintomas Negados</label>
              <div className="grid grid-cols-1 gap-2">
                {sintomasNegadosComuns.map(sintoma => (
                  <button
                    key={sintoma}
                    onClick={() => toggleSintoma(sintoma, 'sintomasNegados')}
                    className={`p-2 text-xs rounded border text-left ${
                      formData.sintomasNegados.includes(sintoma)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {sintoma}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fatores Associados</label>
              <textarea
                placeholder="Ex: familiares com sintomas similares, mudança alimentar, viagens"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="2"
                value={formData.fatoresAssociados}
                onChange={(e) => setFormData(prev => ({...prev, fatoresAssociados: e.target.value}))}
              />
            </div>
          </div>

          {/* APP, MUC, Alergias */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Antecedentes</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">APP - Antecedentes Patológicos</label>
                <input
                  type="text"
                  placeholder="Ex: HAS, DM, ou deixe vazio para 'NEGA PATOLOGIAS'"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.patologias}
                  onChange={(e) => setFormData(prev => ({...prev, patologias: e.target.value}))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MUC - Medicações em Uso Contínuo</label>
                <input
                  type="text"
                  placeholder="Ex: Losartana 50mg/dia, ou deixe vazio para 'NEGA USO'"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.medicacoes}
                  onChange={(e) => setFormData(prev => ({...prev, medicacoes: e.target.value}))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                <input
                  type="text"
                  placeholder="Ex: Penicilina, ou deixe vazio para 'NEGA ALERGIAS'"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.alergias}
                  onChange={(e) => setFormData(prev => ({...prev, alergias: e.target.value}))}
                />
              </div>
            </div>
          </div>

          {/* Exame Físico */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Exame Físico</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado Geral</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setFormData(prev => ({...prev, estadoGeralTipo: 'normal'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.estadoGeralTipo === 'normal'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({...prev, estadoGeralTipo: 'alterado'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.estadoGeralTipo === 'alterado'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Alterado
                  </button>
                </div>
                {formData.estadoGeralTipo === 'normal' ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-green-50"
                    rows="2"
                    value={formData.estadoGeral}
                    onChange={(e) => setFormData(prev => ({...prev, estadoGeral: e.target.value}))}
                  />
                ) : (
                  <textarea
                    placeholder="Descreva as alterações encontradas no estado geral..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-red-50"
                    rows="2"
                    value={formData.estadoGeralAlterado}
                    onChange={(e) => setFormData(prev => ({...prev, estadoGeralAlterado: e.target.value}))}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aparelho Respiratório</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoRespiratorioTipo: 'normal'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoRespiratorioTipo === 'normal'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoRespiratorioTipo: 'alterado'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoRespiratorioTipo === 'alterado'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Alterado
                  </button>
                </div>
                {formData.aparelhoRespiratorioTipo === 'normal' ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-green-50"
                    rows="2"
                    value={formData.aparelhoRespiratorio}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoRespiratorio: e.target.value}))}
                  />
                ) : (
                  <textarea
                    placeholder="Descreva as alterações encontradas no aparelho respiratório..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-red-50"
                    rows="2"
                    value={formData.aparelhoRespiratorioAlterado}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoRespiratorioAlterado: e.target.value}))}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aparelho Cardiovascular</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoCardiovascularTipo: 'normal'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoCardiovascularTipo === 'normal'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoCardiovascularTipo: 'alterado'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoCardiovascularTipo === 'alterado'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Alterado
                  </button>
                </div>
                {formData.aparelhoCardiovascularTipo === 'normal' ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-green-50"
                    rows="2"
                    value={formData.aparelhoCardiovascular}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoCardiovascular: e.target.value}))}
                  />
                ) : (
                  <textarea
                    placeholder="Descreva as alterações encontradas no aparelho cardiovascular..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-red-50"
                    rows="2"
                    value={formData.aparelhoCardiovascularAlterado}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoCardiovascularAlterado: e.target.value}))}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aparelho Gastrointestinal</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoGastrointestinalTipo: 'normal'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoGastrointestinalTipo === 'normal'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({...prev, aparelhoGastrointestinalTipo: 'alterado'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.aparelhoGastrointestinalTipo === 'alterado'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Alterado
                  </button>
                </div>
                {formData.aparelhoGastrointestinalTipo === 'normal' ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-green-50"
                    rows="2"
                    value={formData.aparelhoGastrointestinal}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoGastrointestinal: e.target.value}))}
                  />
                ) : (
                  <textarea
                    placeholder="Descreva as alterações encontradas no aparelho gastrointestinal..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-red-50"
                    rows="2"
                    value={formData.aparelhoGastrointestinalAlterado}
                    onChange={(e) => setFormData(prev => ({...prev, aparelhoGastrointestinalAlterado: e.target.value}))}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outros Aparelhos</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setFormData(prev => ({...prev, outrosAparelhosTipo: 'normal'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.outrosAparelhosTipo === 'normal'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({...prev, outrosAparelhosTipo: 'alterado'}))}
                    className={`px-3 py-1 text-xs rounded ${
                      formData.outrosAparelhosTipo === 'alterado'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Alterado
                  </button>
                </div>
                {formData.outrosAparelhosTipo === 'normal' ? (
                  <textarea
                    placeholder="Ex: Sistema Nervoso, Osteomuscular, etc."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-green-50"
                    rows="2"
                    value={formData.outrosAparelhos}
                    onChange={(e) => setFormData(prev => ({...prev, outrosAparelhos: e.target.value}))}
                  />
                ) : (
                  <textarea
                    placeholder="Descreva as alterações encontradas em outros aparelhos..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-red-50"
                    rows="2"
                    value={formData.outrosAparelhosAlterado}
                    onChange={(e) => setFormData(prev => ({...prev, outrosAparelhosAlterado: e.target.value}))}
                  />
                )}
              </div>
            </div>
          </div>

          {/* HD e Conduta */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">Hipótese Diagnóstica e Conduta</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HD - Hipótese Diagnóstica</label>
                <input
                  type="text"
                  placeholder="Ex: GECA, IVAS, ITU"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.hipoteseDiagnostica}
                  onChange={(e) => setFormData(prev => ({...prev, hipoteseDiagnostica: e.target.value}))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CD - Conduta</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="4"
                  value={formData.conduta}
                  onChange={(e) => setFormData(prev => ({...prev, conduta: e.target.value}))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview e Ações */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Copy size={16} />
              Copiar
            </button>
            <button
              onClick={downloadTxt}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <RotateCcw size={16} />
              Limpar
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview da Anamnese</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded border max-h-96 overflow-y-auto">
              {generateAnamnese()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}