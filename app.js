let currentStep = 0;
let formData = {
    nome: '',
    faturamento: '',
    plataformaEcommerce: '',
    plataformaEcommerceOutra: '',
    nomeLoja: '',
    prefereNaoDizer: false,
    carrinhoAbandonado: '',
    plataformaCarrinho: '',
    plataformaCarrinhoOutra: '',
    pedidosRecusados: '',
    recuperacao: '',
    posVenda: '',
    atendimento: '',
    telefone: ''
};

const questions = [
    {
        id: 'nome',
        title: 'Qual é o seu nome?',
        icon: 'mdi-account',
        field: 'nome',
        type: 'text',
        placeholder: 'Digite seu nome completo'
    },
    {
        id: 'faturamento',
        title: 'Qual o faturamento mensal da sua loja?',
        icon: 'mdi-currency-usd',
        field: 'faturamento',
        options: [
            { value: 'ate10k', label: 'Até R$ 10.000', points: 1 },
            { value: '10k-30k', label: 'R$ 10.000 - R$ 30.000', points: 2 },
            { value: '30k-100k', label: 'R$ 30.000 - R$ 100.000', points: 3 },
            { value: 'acima100k', label: 'Acima de R$ 100.000', points: 4 }
        ]
    },
    {
        id: 'plataformaEcommerce',
        title: 'Qual plataforma de e-commerce você usa?',
        icon: 'mdi-cart',
        field: 'plataformaEcommerce',
        type: 'select',
        options: [
            { value: 'shopify', label: 'Shopify' },
            { value: 'nuvemshop', label: 'Nuvemshop' },
            { value: 'woocommerce', label: 'WooCommerce' },
            { value: 'tray', label: 'Tray' },
            { value: 'vtex', label: 'VTEX' },
            { value: 'outra', label: 'Outra' }
        ]
    },
    {
        id: 'nomeLoja',
        title: 'Qual é o nome da sua loja?',
        icon: 'mdi-store',
        field: 'nomeLoja',
        type: 'text',
        placeholder: 'Digite o nome da loja',
        hasCheckbox: true,
        checkboxLabel: 'Prefiro não dizer'
    },
    {
        id: 'carrinhoAbandonado',
        title: 'Você recupera carrinhos abandonados?',
        icon: 'mdi-cart-off',
        field: 'carrinhoAbandonado',
        options: [
            { value: 'nao', label: 'Não, ainda não recupero', points: 0, critical: true },
            { value: 'email', label: 'Sim, por e-mail', points: 1 },
            { value: 'whatsapp-manual', label: 'Sim, por WhatsApp manual', points: 2 },
            { value: 'automatizado', label: 'Sim, automatizado', points: 4 }
        ]
    },
    {
        id: 'plataformaCarrinho',
        title: 'Qual plataforma você usa para recuperar carrinhos?',
        icon: 'mdi-cog',
        field: 'plataformaCarrinho',
        conditional: true,
        showWhen: ['email', 'whatsapp-manual', 'automatizado'],
        options: [
            { value: 'unicodrop', label: 'Unicodrop', points: 0 },
            { value: 'reportana', label: 'Reportana', points: 0 },
            { value: 'activecampaign', label: 'ActiveCampaign', points: 0 },
            { value: 'dropi', label: 'Dropi', points: 0 },
            { value: 'outra', label: 'Outra', points: 0 }
        ]
    },
    {
        id: 'pedidosRecusados',
        title: 'Quantos pedidos são recusados por mês?',
        icon: 'mdi-close-circle',
        field: 'pedidosRecusados',
        options: [
            { value: 'nao-sei', label: 'Não sei ou não acompanho', points: 0, critical: true },
            { value: 'ate10', label: 'Até 10 pedidos recusados', points: 3 },
            { value: '10-20', label: 'Entre 10 e 20 pedidos recusados', points: 1, warning: true },
            { value: 'acima20', label: 'Mais de 20 pedidos recusados', points: 0, critical: true }
        ]
    },
    {
        id: 'recuperacao',
        title: 'Você tenta recuperar pedidos recusados?',
        icon: 'mdi-refresh',
        field: 'recuperacao',
        options: [
            { value: 'nao', label: 'Não, nunca tento recuperar', points: 0, critical: true },
            { value: 'as-vezes', label: 'Às vezes', points: 1 },
            { value: 'sempre-manual', label: 'Sempre, manual', points: 2 },
            { value: 'automatizado', label: 'Automatizado', points: 4 }
        ]
    },
    {
        id: 'posVenda',
        title: 'Você faz pós-venda automatizado?',
        icon: 'mdi-email-check',
        field: 'posVenda',
        options: [
            { value: 'nao', label: 'Não faço pós-venda', points: 0, warning: true },
            { value: 'email', label: 'Sim, por e-mail', points: 1 },
            { value: 'manual', label: 'Sim, manual', points: 2 },
            { value: 'automatizado', label: 'Sim, automatizado', points: 4 }
        ]
    },
    {
        id: 'atendimento',
        title: 'Como funciona seu atendimento ao cliente?',
        icon: 'mdi-headset',
        field: 'atendimento',
        options: [
            { value: 'manual-total', label: 'Manual total', points: 0, warning: true },
            { value: 'equipe', label: 'Equipe dedicada', points: 2 },
            { value: 'hibrido', label: 'Híbrido (manual + automação)', points: 3 },
            { value: 'automatizado', label: 'Totalmente automatizado', points: 4 }
        ]
    },
    {
        id: 'telefone',
        title: 'Para finalizar, deixe seu WhatsApp para receber uma análise personalizada',
        icon: 'mdi-whatsapp',
        field: 'telefone',
        type: 'tel',
        placeholder: '(00) 00000-0000'
    }
];

// Utils principais

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert-custom alert-${type}`;
    alert.innerHTML = `
        <i class="mdi ${type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'}"></i>
        <span>${message}</span>
    `;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function scrollToForm() {
    const formSection = document.getElementById('audit-form');
    if (formSection) {
        currentStep = 0;
        renderQuestion();
        setTimeout(() => {
            const formRect = formSection.getBoundingClientRect();
            const formTop = formRect.top + window.pageYOffset;
            const formHeight = formRect.height;
            const windowHeight = window.innerHeight;
            const scrollPosition = formTop - (windowHeight / 2) + (formHeight / 2);

            window.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        }, 100);
    }
}

function formatPhone(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
    }
}

function validateTelefone(telefone) {
    const numbers = telefone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
}
function validateName(name) {
    return name.trim().length >= 2;
}
function validateStoreName(name) {
    return name.trim().length >= 2;
}

function setFieldError(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (hasError) {
            field.classList.add('field-error');
        } else {
            field.classList.remove('field-error');
        }
    }
}

let isProcessing = false;

function getValidQuestionsCount() {
    let count = 0;
    questions.forEach(q => {
        if (!q.conditional) {
            count++;
        } else {
            const parentQuestion = questions.find(pq => pq.field === 'carrinhoAbandonado');
            if (parentQuestion && q.showWhen.includes(formData.carrinhoAbandonado)) {
                count++;
            }
        }
    });
    return count;
}

function getCurrentValidQuestionIndex() {
    let validIndex = 0;
    for (let i = 0; i <= currentStep; i++) {
        const q = questions[i];
        if (!q.conditional) {
            validIndex++;
        } else {
            const parentQuestion = questions.find(pq => pq.field === 'carrinhoAbandonado');
            if (parentQuestion && q.showWhen.includes(formData.carrinhoAbandonado)) {
                validIndex++;
            }
        }
    }
    return validIndex;
}

function renderQuestion(shouldFocus = true) {
    let question = questions[currentStep];

    // Se for condicional e não mostrar, pula
    if (question.conditional) {
        const parentQuestion = questions.find(q => q.field === 'carrinhoAbandonado');
        if (parentQuestion && !question.showWhen.includes(formData.carrinhoAbandonado)) {
            if (currentStep < questions.length - 1) {
                currentStep++;
                question = questions[currentStep];
            } else {
                showResults();
                return;
            }
        }
    }

    const validQuestionsCount = getValidQuestionsCount();
    const currentValidIndex = getCurrentValidQuestionIndex();
    const progress = (currentValidIndex / validQuestionsCount) * 100;

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.transition = 'width 0.5s ease';
        progressBar.style.width = `${progress}%`;
    }

    document.getElementById('current-question').textContent = currentValidIndex;
    document.getElementById('total-questions').textContent = validQuestionsCount;

    const questionTitle = document.getElementById('question-title');
    if (question.icon) {
        questionTitle.innerHTML = `<i class="mdi ${question.icon}"></i><span>${question.title}</span>`;
    } else {
        questionTitle.innerHTML = `<span>${question.title}</span>`;
    }

    const questionBody = document.getElementById('question-body');
    questionBody.style.opacity = '0';
    questionBody.style.transform = 'translateY(10px)';

    setTimeout(() => {
        if (question.type) {
            // Input com checkbox "Prefiro não dizer"
            if (question.hasCheckbox) {
                questionBody.innerHTML = `
                <div class="form-group-audit">
                        <input type="${question.type}" 
                               class="form-control-audit" 
                               name="${question.field}" 
                               id="field-${question.field}"
                               placeholder="${question.placeholder}"
                               value="${formData.prefereNaoDizer ? '' : (formData[question.field] || '')}"
                               ${formData.prefereNaoDizer ? 'disabled' : ''}>
                        <div class="checkbox-wrapper" style="margin-top: 0.75rem;">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                <input type="checkbox" 
                                       id="checkbox-${question.field}" 
                                       ${formData.prefereNaoDizer ? 'checked' : ''}
                                       style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="font-size: 0.9375rem; color: var(--gray-700);">${question.checkboxLabel}</span>
                    </label>
                        </div>
                    </div>
                `;

                const input = document.getElementById(`field-${question.field}`);
                const checkbox = document.getElementById(`checkbox-${question.field}`);

                if (checkbox) {
                    checkbox.addEventListener('change', (e) => {
                        formData.prefereNaoDizer = e.target.checked;
                        if (e.target.checked) {
                            formData[question.field] = '';
                            if (input) {
                                input.value = '';
                                input.disabled = true;
                            }
                        } else {
                            if (input) {
                                input.disabled = false;
                                input.focus();
                            }
                        }
                    });
                }

                if (input) {
                    input.addEventListener('input', (e) => {
                        formData[question.field] = e.target.value;
                        setFieldError(`field-${question.field}`, false);
                    });
                    input.addEventListener('blur', (e) => {
                        validateField(question.field, e.target.value);
                    });
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            nextQuestion();
                        }
                    });
                    if (!formData.prefereNaoDizer && shouldFocus) {
                        setTimeout(() => {
                            input.focus();
                        }, 100);
                    }
                }
            }
            // Select renderizado como botões
            else if (question.type === 'select') {
                questionBody.innerHTML = `
                    <div class="form-group-audit">
                        <div class="option-button-wrapper">
                            ${question.options.map(opt => `
                                <button type="button" 
                                        class="option-button ${formData[question.field] === opt.value ? 'selected' : ''}"
                                        onclick="selectOption('${question.field}', '${opt.value}')"
                                        data-value="${opt.value}">
                                    <div class="option-header">
                                        <div class="option-content">
                                            <span class="option-label">${opt.label}</span>
                                            ${formData[question.field] === opt.value ? '<i class="mdi mdi-check-circle option-icon"></i>' : ''}
                                        </div>
                                    </div>
                                </button>
                            `).join('')}
                        </div>
                        ${question.field === 'plataformaEcommerce' ? `
                            <div id="plataforma-ecommerce-outra-wrapper" style="display: ${formData.plataformaEcommerce === 'outra' ? 'block' : 'none'}; margin-top: 1rem;">
                                <label class="form-label-audit">
                                    <i class="mdi mdi-textbox"></i>
                                    Qual plataforma?
                                </label>
                                <input type="text" 
                                       class="form-control-audit" 
                                       name="plataformaEcommerceOutra" 
                                       id="field-plataformaEcommerceOutra"
                                       placeholder="Ex: Magento, PrestaShop, etc."
                                       value="${formData.plataformaEcommerceOutra || ''}">
                            </div>
                        ` : ''}
                </div>
                `;

                const plataformaEcommerceOutraInput = document.getElementById('field-plataformaEcommerceOutra');
                if (plataformaEcommerceOutraInput) {
                    plataformaEcommerceOutraInput.addEventListener('input', (e) => {
                        formData.plataformaEcommerceOutra = e.target.value;
                    });
                }
            }
            // Input texto normal
            else {
                questionBody.innerHTML = `
                    <div class="form-group-audit">
                        <input type="${question.type}" 
                               class="form-control-audit" 
                               name="${question.field}" 
                               id="field-${question.field}"
                               placeholder="${question.placeholder}"
                               value="${formData[question.field] || ''}"
                               ${question.field === 'telefone' ? 'maxlength="15"' : ''}>
                    </div>
                `;

                const input = document.getElementById(`field-${question.field}`);
                if (input) {
                    input.addEventListener('input', (e) => {
                        let value = e.target.value;
                        if (question.field === 'telefone') {
                            value = formatPhone(value);
                            e.target.value = value;
                        }
                        formData[question.field] = question.field === 'telefone' ? value.replace(/\D/g, '') : value;
                        setFieldError(`field-${question.field}`, false);
                    });
                    input.addEventListener('blur', (e) => {
                        validateField(question.field, e.target.value);
                    });
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            nextQuestion();
                        }
                    });
                    if (shouldFocus) {
                        setTimeout(() => {
                            input.focus();
                        }, 100);
                    }
                }
            }
        }
        // Múltipla escolha
        else {
            questionBody.innerHTML = `
                <div class="option-button-wrapper">
                    ${question.options.map(option => `
                        <button type="button" 
                                class="option-button ${formData[question.field] === option.value ? 'selected' : ''} ${option.critical ? 'has-badge critical-badge' : ''} ${option.warning ? 'has-badge warning-badge' : ''}"
                                onclick="selectOption('${question.field}', '${option.value}')"
                                data-value="${option.value}">
                            <div class="option-header">
                                <div class="option-content">
                                    <span class="option-label">${option.label}</span>
                                    ${formData[question.field] === option.value ? '<i class="mdi mdi-check-circle option-icon"></i>' : ''}
                                </div>
                                ${option.critical ? '<span class="option-badge critical"><i class="mdi mdi-alert-circle"></i> Ponto crítico</span>' : ''}
                                ${option.warning ? '<span class="option-badge warning"><i class="mdi mdi-alert"></i> Atenção</span>' : ''}
                            </div>
                        </button>
                    `).join('')}
                </div>
                ${question.id === 'plataformaCarrinho' ? `
                    <div id="plataforma-carrinho-outra-wrapper" style="display: ${formData.plataformaCarrinho === 'outra' ? 'block' : 'none'}; margin-top: 1rem;">
                        <label class="form-label-audit">
                            <i class="mdi mdi-textbox"></i>
                            Qual plataforma você usa?
                        </label>
                        <input type="text" 
                               class="form-control-audit" 
                               name="plataformaCarrinhoOutra" 
                               id="field-plataformaCarrinhoOutra"
                               placeholder="Ex: ActiveCampaign, SendGrid, etc."
                               value="${formData.plataformaCarrinhoOutra || ''}">
                    </div>
                ` : ''}
            `;
            if (question.id === 'plataformaCarrinho') {
                setTimeout(() => {
                    const outraWrapper = document.getElementById('plataforma-carrinho-outra-wrapper');
                    if (outraWrapper && formData.plataformaCarrinho === 'outra') {
                        const outraInput = document.getElementById('field-plataformaCarrinhoOutra');
                        if (outraInput) {
                            // Adicionar event listener (pode ser adicionado múltiplas vezes, mas não causa problema)
                            outraInput.addEventListener('input', function(e) {
                                formData.plataformaCarrinhoOutra = e.target.value;
                                setFieldError('field-plataformaCarrinhoOutra', false);
                            });
                            outraInput.focus();
                        }
                    }
                }, 100);
            }
        }

        questionBody.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        questionBody.style.opacity = '1';
        questionBody.style.transform = 'translateY(0)';
    }, 50);

    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnNextText = document.getElementById('btn-next-text');

    btnBack.style.display = currentStep > 0 ? 'block' : 'none';
    if (btnNextText) {
        const nextIndex = getNextQuestionIndex();
        btnNextText.textContent = nextIndex >= questions.length ? 'Ver Resultados' : 'Próxima';
    }

    // Scroll centraliza apenas se não for o carregamento inicial
    if (currentStep > 0 && shouldFocus) {
        setTimeout(() => {
            const questionCard = document.querySelector('.question-card-form');
            if (questionCard) {
                const cardRect = questionCard.getBoundingClientRect();
                const cardTop = cardRect.top + window.pageYOffset;
                const cardHeight = cardRect.height;
                const windowHeight = window.innerHeight;
                const scrollPosition = cardTop - (windowHeight / 2) + (cardHeight / 2);

                window.scrollTo({
                    top: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

function validateField(fieldName, value) {
    let isValid = true;
    switch (fieldName) {
        case 'nome':
            isValid = validateName(value);
            if (!isValid) showAlert('Por favor, informe seu nome completo', 'danger');
            break;
        case 'telefone':
            isValid = validateTelefone(value);
            if (!isValid) showAlert('Por favor, informe um WhatsApp válido com DDD', 'danger');
            break;
        case 'nomeLoja':
            isValid = true;
            break;
        case 'plataformaEcommerce':
            isValid = value.trim() !== '';
            if (!isValid) showAlert('Por favor, selecione a plataforma de e-commerce que você usa', 'danger');
            break;
    }
    setFieldError(`field-${fieldName}`, !isValid);
    return isValid;
}

function getNextQuestionIndex() {
    const currentQuestion = questions[currentStep];

    // Se for carrinhoAbandonado, pode ter condicional a seguir
    if (currentQuestion.field === 'carrinhoAbandonado') {
        const conditionalQuestion = questions.find(q => q.id === 'plataformaCarrinho');
        if (conditionalQuestion && conditionalQuestion.showWhen.includes(formData.carrinhoAbandonado)) {
            if (!formData.plataformaCarrinho) {
                const conditionalIndex = questions.findIndex(q => q.id === 'plataformaCarrinho');
                if (conditionalIndex !== -1) {
                    return conditionalIndex;
                }
            }
        }
    }

    let nextIndex = currentStep + 1;
    while (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        if (nextQuestion.conditional) {
            const parentQuestion = questions.find(q => q.field === 'carrinhoAbandonado');
            if (parentQuestion && !nextQuestion.showWhen.includes(formData.carrinhoAbandonado)) {
                nextIndex++;
                continue;
            }
        }
        break;
    }
    return nextIndex;
}

function selectOption(field, value) {
    formData[field] = value;

    const buttons = document.querySelectorAll(`.option-button[data-value]`);
    buttons.forEach(btn => {
        if (btn.getAttribute('data-value') === value) {
            btn.classList.add('selected');
            btn.querySelector('.option-icon')?.remove();
            const icon = document.createElement('i');
            icon.className = 'mdi mdi-check-circle option-icon';
            btn.querySelector('.option-content')?.appendChild(icon);
        } else {
            btn.classList.remove('selected');
            btn.querySelector('.option-icon')?.remove();
        }
    });

    if (field === 'plataformaCarrinho') {
        const outraWrapper = document.getElementById('plataforma-carrinho-outra-wrapper');
        if (outraWrapper) {
            if (value === 'outra') {
                outraWrapper.style.display = 'block';
                setTimeout(() => {
                    const outraInput = document.getElementById('field-plataformaCarrinhoOutra');
                    if (outraInput) {
                        // Garantir que o event listener está adicionado
                        // Remover listener anterior se existir para evitar duplicação
                        const newInput = outraInput.cloneNode(true);
                        outraInput.parentNode.replaceChild(newInput, outraInput);
                        
                        // Adicionar novo listener
                        newInput.addEventListener('input', function(e) {
                            formData.plataformaCarrinhoOutra = e.target.value.trim();
                            setFieldError('field-plataformaCarrinhoOutra', false);
                        });
                        
                        // Atualizar formData com valor atual se já existir
                        if (formData.plataformaCarrinhoOutra) {
                            newInput.value = formData.plataformaCarrinhoOutra;
                        }
                        
                        newInput.focus();
                    }
                }, 100);
            } else {
                outraWrapper.style.display = 'none';
                formData.plataformaCarrinhoOutra = '';
            }
        }
        if (value !== 'outra') {
            setTimeout(() => {
                nextQuestion();
            }, 300);
        }
        return;
    }

    if (field === 'plataformaEcommerce') {
        const outraWrapper = document.getElementById('plataforma-ecommerce-outra-wrapper');
        if (outraWrapper) {
            if (value === 'outra') {
                outraWrapper.style.display = 'block';
                setTimeout(() => {
                    const outraInput = document.getElementById('field-plataformaEcommerceOutra');
                    if (outraInput) outraInput.focus();
                }, 100);
            } else {
                outraWrapper.style.display = 'none';
                formData.plataformaEcommerceOutra = '';
            }
        }
        if (value !== 'outra') {
            setTimeout(() => {
                nextQuestion();
            }, 300);
        }
        return;
    }

    const nextIndex = getNextQuestionIndex();
    if (nextIndex < questions.length && nextIndex !== currentStep + 1) {
        setTimeout(() => {
            currentStep = nextIndex;
            renderQuestion();
        }, 300);
    } else if (nextIndex < questions.length) {
        setTimeout(() => {
            nextQuestion();
        }, 300);
    }
}

function nextQuestion() {
    if (isProcessing) return;
    const question = questions[currentStep];
    let isValid = true;

    if (question.type) {
        if (question.field === 'nome') {
            if (!validateName(formData.nome)) {
                setFieldError('field-nome', true);
                isValid = false;
            }
        } else if (question.field === 'telefone') {
            if (!validateTelefone(formData.telefone)) {
                setFieldError('field-telefone', true);
                isValid = false;
            }
        } else if (question.field === 'plataformaEcommerce') {
            if (!formData.plataformaEcommerce || formData.plataformaEcommerce.trim() === '') {
                setFieldError('field-plataformaEcommerce', true);
                isValid = false;
            } else if (formData.plataformaEcommerce === 'outra') {
                if (!formData.plataformaEcommerceOutra || formData.plataformaEcommerceOutra.trim() === '') {
                    setFieldError('field-plataformaEcommerceOutra', true);
                    isValid = false;
                }
            }
        } else if (question.field === 'nomeLoja') {
            // opcional
            if (!formData.prefereNaoDizer && !formData.nomeLoja.trim()) {
                // permitido vazio
            }
        }
        if (!isValid) {
            showAlert('Por favor, preencha o campo corretamente', 'danger');
            return;
        }
    } else {
        if (!formData[question.field]) {
            showAlert('Por favor, selecione uma opção antes de continuar', 'danger');
            const buttons = document.querySelectorAll('.option-button');
            buttons.forEach(btn => {
                btn.style.animation = 'shake 0.5s ease';
            });
            setTimeout(() => {
                buttons.forEach(btn => btn.style.animation = '');
            }, 500);
            return;
        }
        if (question.id === 'plataformaCarrinho') {
            const shouldShowPlatform = ['email', 'whatsapp-manual', 'automatizado'].includes(formData.carrinhoAbandonado);
            if (shouldShowPlatform && !formData.plataformaCarrinho) {
                showAlert('Por favor, selecione a plataforma que você usa', 'danger');
                const buttons = document.querySelectorAll('.option-button');
                buttons.forEach(btn => {
                    btn.style.animation = 'shake 0.5s ease';
                });
                setTimeout(() => {
                    buttons.forEach(btn => btn.style.animation = '');
                }, 500);
                return;
            }
            if (formData.plataformaCarrinho === 'outra') {
                // Verificar o valor atual do campo, não apenas o formData
                const outraInput = document.getElementById('field-plataformaCarrinhoOutra');
                const outraValue = outraInput ? outraInput.value.trim() : (formData.plataformaCarrinhoOutra || '').trim();
                
                if (!outraValue) {
                    showAlert('Por favor, informe qual plataforma você usa', 'danger');
                    if (outraInput) {
                        outraInput.classList.add('field-error');
                        outraInput.focus();
                    }
                    return;
                } else {
                    // Atualizar formData com o valor atual do campo
                    formData.plataformaCarrinhoOutra = outraValue;
                    if (outraInput) {
                        setFieldError('field-plataformaCarrinhoOutra', false);
                    }
                }
            }
        }
        if (question.id === 'plataformaEcommerce') {
            if (!formData.plataformaEcommerce) {
                showAlert('Por favor, selecione a plataforma de e-commerce que você usa', 'danger');
                const buttons = document.querySelectorAll('.option-button');
                buttons.forEach(btn => {
                    btn.style.animation = 'shake 0.5s ease';
                });
                setTimeout(() => {
                    buttons.forEach(btn => btn.style.animation = '');
                }, 500);
                return;
            }
            if (formData.plataformaEcommerce === 'outra') {
                if (!formData.plataformaEcommerceOutra || formData.plataformaEcommerceOutra.trim() === '') {
                    showAlert('Por favor, informe qual plataforma você usa', 'danger');
                    const outraInput = document.getElementById('field-plataformaEcommerceOutra');
                    if (outraInput) {
                        outraInput.classList.add('field-error');
                        outraInput.focus();
                    }
                    return;
                }
            }
        }
    }

    if (currentStep < questions.length - 1) {
        isProcessing = true;
        currentStep++;

        let nextQuestion = questions[currentStep];
        if (nextQuestion && nextQuestion.conditional) {
            const parentQuestion = questions.find(q => q.field === 'carrinhoAbandonado');
            if (parentQuestion && !nextQuestion.showWhen.includes(formData.carrinhoAbandonado)) {
                if (currentStep < questions.length - 1) {
                    currentStep++;
                } else {
                    isProcessing = false;
                    showResults();
                    return;
                }
            }
        }
        renderQuestion();
        setTimeout(() => {
            isProcessing = false;
        }, 600);
    } else {
        isProcessing = true;
        showResults();
    }
}

function previousQuestion() {
    if (isProcessing) return;
    if (currentStep > 0) {
        isProcessing = true;
        currentStep--;
        let prevQuestion = questions[currentStep];
        if (prevQuestion && prevQuestion.conditional) {
            const parentQuestion = questions.find(q => q.field === 'carrinhoAbandonado');
            if (parentQuestion && !prevQuestion.showWhen.includes(formData.carrinhoAbandonado)) {
                if (currentStep > 0) {
                    currentStep--;
                } else {
                    isProcessing = false;
                    return;
                }
            }
        }
        renderQuestion();
        setTimeout(() => {
            isProcessing = false;
        }, 600);
    }
}

// Detalhes de flags
const flagDetails = {
    'carrinhoAbandonado': {
        title: 'Carrinho Abandonado',
        description: 'Você está perdendo entre 60-80% das vendas potenciais',
        impactType: 'loss',
        impactLabel: 'Perda estimada'
    },
    'pedidosRecusados': {
        title: 'Pedidos Recusados',
        description: 'Alto índice de recusas sem acompanhamento',
        impactType: 'loss',
        impactLabel: 'Perda estimada'
    },
    'recuperacao': {
        title: 'Recuperação de Vendas',
        description: 'Sem processo para recuperar pedidos perdidos',
        impactType: 'opportunity',
        impactLabel: 'Oportunidade'
    },
    'posVenda': {
        title: 'Pós-Venda',
        description: 'Perdendo oportunidade de fidelização e upsell',
        impactType: 'opportunity',
        impactLabel: 'Oportunidade'
    },
    'atendimento': {
        title: 'Atendimento',
        description: 'Processo manual aumenta custos e reduz eficiência',
        impactType: 'opportunity',
        impactLabel: 'Oportunidade'
    }
};

// Impacto estimado por flag
function calculateFlagImpact(flagField, faturamento) {
    const impactRanges = {
        'carrinhoAbandonado': {
            'ate10k': { min: 600, max: 1200 },
            '10k-30k': { min: 2400, max: 4800 },
            '30k-100k': { min: 6000, max: 12000 },
            'acima100k': { min: 15000, max: 30000 }
        },
        'pedidosRecusados': {
            'ate10k': { min: 200, max: 500 },
            '10k-30k': { min: 800, max: 2100 },
            '30k-100k': { min: 2000, max: 5000 },
            'acima100k': { min: 5000, max: 12000 }
        },
        'recuperacao': {
            'ate10k': { min: 150, max: 400 },
            '10k-30k': { min: 400, max: 1200 },
            '30k-100k': { min: 1000, max: 3000 },
            'acima100k': { min: 2500, max: 7500 }
        },
        'posVenda': {
            'ate10k': { min: 100, max: 300 },
            '10k-30k': { min: 300, max: 900 },
            '30k-100k': { min: 750, max: 2250 },
            'acima100k': { min: 2000, max: 6000 }
        },
        'atendimento': {
            'ate10k': { min: 200, max: 600 },
            '10k-30k': { min: 600, max: 1800 },
            '30k-100k': { min: 1500, max: 4500 },
            'acima100k': { min: 4000, max: 12000 }
        }
    };

    const range = impactRanges[flagField]?.[faturamento] || { min: 0, max: 0 };
    return range;
}

// Score total e flags
function calculateResults() {
    let totalPoints = 0;
    const criticalFlags = [];
    const warningFlags = [];

    // Pergunta 1 - Faturamento
    const fatQuestion = questions.find(q => q.id === 'faturamento');
    const fatPoints = fatQuestion?.options.find(o => o.value === formData.faturamento)?.points || 0;
    totalPoints += fatPoints;

    // Pergunta 2 - Carrinho Abandonado
    const carrQuestion = questions.find(q => q.id === 'carrinhoAbandonado');
    const carrPoints = carrQuestion?.options.find(o => o.value === formData.carrinhoAbandonado)?.points || 0;
    totalPoints += carrPoints;
    if (formData.carrinhoAbandonado === 'nao') {
        const details = flagDetails.carrinhoAbandonado;
        const impact = calculateFlagImpact('carrinhoAbandonado', formData.faturamento);
        criticalFlags.push({
            field: 'carrinhoAbandonado',
            description: 'Não recupera carrinhos abandonados',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    }

    // Pergunta 3 - Pedidos Recusados
    const pedidosQuestion = questions.find(q => q.id === 'pedidosRecusados');
    const pedidosPoints = pedidosQuestion?.options.find(o => o.value === formData.pedidosRecusados)?.points || 0;
    totalPoints += pedidosPoints;
    if (formData.pedidosRecusados === 'nao-sei' || formData.pedidosRecusados === 'acima20') {
        const details = flagDetails.pedidosRecusados;
        const impact = calculateFlagImpact('pedidosRecusados', formData.faturamento);
        criticalFlags.push({
            field: 'pedidosRecusados',
            description: 'Alto volume de pedidos recusados ou desconhecimento',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    } else if (formData.pedidosRecusados === '10-20') {
        const details = flagDetails.pedidosRecusados;
        const impact = calculateFlagImpact('pedidosRecusados', formData.faturamento);
        warningFlags.push({
            field: 'pedidosRecusados',
            description: 'Volume moderado de pedidos recusados',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    }

    // Pergunta 4 - Recuperação
    const recQuestion = questions.find(q => q.id === 'recuperacao');
    const recPoints = recQuestion?.options.find(o => o.value === formData.recuperacao)?.points || 0;
    totalPoints += recPoints;
    if (formData.recuperacao === 'nao') {
        const details = flagDetails.recuperacao;
        const impact = calculateFlagImpact('recuperacao', formData.faturamento);
        criticalFlags.push({
            field: 'recuperacao',
            description: 'Não recupera pedidos recusados',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    }

    // Pergunta 5 - Pós-venda
    const posQuestion = questions.find(q => q.id === 'posVenda');
    const posPoints = posQuestion?.options.find(o => o.value === formData.posVenda)?.points || 0;
    totalPoints += posPoints;
    if (formData.posVenda === 'nao') {
        const details = flagDetails.posVenda;
        const impact = calculateFlagImpact('posVenda', formData.faturamento);
        warningFlags.push({
            field: 'posVenda',
            description: 'Pós-venda não automatizado',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    }

    // Pergunta 6 - Atendimento
    const atendQuestion = questions.find(q => q.id === 'atendimento');
    const atendPoints = atendQuestion?.options.find(o => o.value === formData.atendimento)?.points || 0;
    totalPoints += atendPoints;
    if (formData.atendimento === 'manual-total') {
        const details = flagDetails.atendimento;
        const impact = calculateFlagImpact('atendimento', formData.faturamento);
        warningFlags.push({
            field: 'atendimento',
            description: 'Atendimento totalmente manual',
            title: details.title,
            detail: details.description,
            impactType: details.impactType,
            impactLabel: details.impactLabel,
            impactMin: impact.min,
            impactMax: impact.max
        });
    }

    // Determinar classificação
    let classificacao = 'low';
    if (totalPoints >= 17) {
        classificacao = 'high';
    } else if (totalPoints >= 9) {
        classificacao = 'medium';
    }

    return {
        score: totalPoints,
        classificacao,
        criticalFlags,
        warningFlags
    };
}

// Arrays de mensagens por faixa
const messagesLow = [
    "Seu negócio está deixando muito dinheiro na mesa por falta de processos essenciais.",
    "Há gargalos críticos que impedem sua loja de capturar vendas que já deveriam ser suas.",
    "Sua operação tem falhas graves em pontos chave e isso reduz diretamente seu faturamento.",
    "O cenário atual indica perdas significativas por ausência de automação e controle."
];

const messagesMedium = [
    "Sua loja tem alguns pontos funcionando, mas ainda há perdas consideráveis que podem ser evitadas.",
    "Você já tem uma base razoável de processos, mas ainda está ficando para trás em áreas importantes.",
    "Seus resultados podem melhorar com ajustes simples e algumas automações estratégicas.",
    "Há oportunidades claras de crescimento que ainda não estão sendo aproveitadas."
];

const messagesHigh = [
    "Sua loja já opera bem, mas ainda existe potencial para escalar com automações avançadas.",
    "Você está no caminho certo, porém ainda há dinheiro sendo perdido por falta de integração total.",
    "Seus processos são bons, mas podem gerar resultados maiores com otimizações específicas.",
    "A base está bem estruturada e com pequenas melhorias você pode elevar ainda mais seu faturamento."
];

// Frases para exibir receita perdida
const revenueLostPhrases = [
    "Com base no seu diagnóstico, você pode estar deixando de ganhar entre R$ X e R$ Y por mês.",
    "Estimamos que sua loja perde aproximadamente R$ X a R$ Y todos os meses devido às falhas identificadas.",
    "Seus resultados atuais indicam perdas mensais na faixa de R$ X a R$ Y.",
    "Sua operação pode estar abrindo mão de um volume significativo de receita, estimado entre R$ X a R$ Y mensais."
];

// CTA personalizado
function getCTA(score, criticalFlags, warningFlags) {
    if (score <= 8) {
        return {
            title: '🚨 Sua operação precisa de uma transformação urgente!',
            description: 'A Unicodrop pode automatizar todos os processos críticos identificados e recuperar as vendas que você está perdendo hoje.',
            buttonText: 'Quero Transformar Minha Operação',
            urgency: 'high'
        };
    }
    if (formData.carrinhoAbandonado === 'nao') {
        return {
            title: '🛒 Recupere até 30% dos carrinhos abandonados',
            description: 'A Unicodrop automatiza a recuperação de carrinhos por WhatsApp e email, transformando visitantes em compradores.',
            buttonText: 'Começar a Recuperar Carrinhos',
            urgency: 'high'
        };
    }
    if (formData.recuperacao === 'nao') {
        return {
            title: '💳 Recupere pedidos recusados automaticamente',
            description: 'A Unicodrop oferece novas formas de pagamento e recupera pedidos recusados em segundos, aumentando sua aprovação em até 25%.',
            buttonText: 'Reduzir Pedidos Recusados',
            urgency: 'high'
        };
    }
    if (score <= 16) {
        return {
            title: '📈 Automatize e escale seus resultados',
            description: 'Você está no caminho certo! A Unicodrop integra todos os seus processos em uma única plataforma, eliminando perdas e aumentando conversão.',
            buttonText: 'Conhecer a Unicodrop',
            urgency: 'medium'
        };
    }
    return {
        title: '🚀 Leve sua operação ao próximo nível',
        description: 'Sua loja já funciona bem. A Unicodrop pode otimizar ainda mais com automações inteligentes e aumentar seu ticket médio.',
        buttonText: 'Maximizar Meus Resultados',
        urgency: 'low'
    };
}

// Receita perdida estimada
function calculateLostRevenue(score, faturamento) {
    const faturamentoMultiplier = {
        'ate10k': 300,
        '10k-30k': 800,
        '30k-100k': 2000,
        'acima100k': 5000
    };

    let lossPercentage;
    if (score <= 8) {
        lossPercentage = 0.25; // 25%
    } else if (score <= 16) {
        lossPercentage = 0.20; // 20%
    } else {
        lossPercentage = 0.08; // 8%
    }

    // 3. Calcular valor base
    const multiplier = faturamentoMultiplier[faturamento] || 300;
    const baseValue = (24 - score) * multiplier * lossPercentage;
    const min = Math.round(baseValue * 0.85);
    const max = Math.round(baseValue * 1.15);

    return { min, max };
}

// Valida se todos os campos obrigatórios foram preenchidos
function validateFormData() {
    const errors = [];

    if (!formData.nome || formData.nome.trim().length < 2) {
        errors.push('Nome é obrigatório');
    }

    if (!formData.telefone || !validateTelefone(formData.telefone)) {
        errors.push('Telefone/WhatsApp é obrigatório e deve ser válido');
    }

    if (!formData.faturamento) {
        errors.push('Faturamento é obrigatório');
    }

    if (!formData.plataformaEcommerce) {
        errors.push('Plataforma de e-commerce é obrigatória');
    }

    if (formData.plataformaEcommerce === 'outra' && !formData.plataformaEcommerceOutra) {
        errors.push('Informe qual plataforma de e-commerce você usa');
    }

    // Validar campos condicionais
    if (formData.carrinhoAbandonado &&
        ['email', 'whatsapp-manual', 'automatizado'].includes(formData.carrinhoAbandonado)) {
        if (!formData.plataformaCarrinho) {
            errors.push('Plataforma de carrinho é obrigatória quando você recupera carrinhos');
        }
        if (formData.plataformaCarrinho === 'outra' && !formData.plataformaCarrinhoOutra) {
            errors.push('Informe qual plataforma você usa para recuperar carrinhos');
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// pegando todos os dados do formulário
function collectFormData() {
    const { score, classificacao, criticalFlags, warningFlags } = calculateResults();
    const { min: receitaPerdidaMin, max: receitaPerdidaMax } = calculateLostRevenue(score, formData.faturamento);

    //  dados  para envio
    const formDataToSubmit = {
        // Dados pessoais
        nome: formData.nome || '',
        telefone: formData.telefone || '',

        // Dados da loja
        nomeLoja: formData.nomeLoja || '',
        prefereNaoDizer: formData.prefereNaoDizer || false,
        faturamento: formData.faturamento || '',

        // Plataforma de e-commerce
        plataformaEcommerce: formData.plataformaEcommerce || '',
        plataformaEcommerceOutra: formData.plataformaEcommerceOutra || '',

        // Carrinho abandonado
        carrinhoAbandonado: formData.carrinhoAbandonado || '',
        plataformaCarrinho: formData.plataformaCarrinho || '',
        plataformaCarrinhoOutra: formData.plataformaCarrinhoOutra || '',

        // Pedidos e recuperação
        pedidosRecusados: formData.pedidosRecusados || '',
        recuperacao: formData.recuperacao || '',

        // Pós-venda e atendimento
        posVenda: formData.posVenda || '',
        atendimento: formData.atendimento || '',

        // Resultados da auditoria
        resultado: {
            score: score || 0,
            classificacao: classificacao || 'low',
            receitaPerdidaMin: receitaPerdidaMin || 0,
            receitaPerdidaMax: receitaPerdidaMax || 0,
            criticalFlags: criticalFlags || [],
            warningFlags: warningFlags || []
        },

        // Metadados
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent || '',
        url: window.location.href || ''
    };

    return formDataToSubmit;
}

// Função para enviar dados ao endpoint
async function submitFormData() {
    let dataToSubmit = null;
    try {
        const validation = validateFormData();
        dataToSubmit = collectFormData();

        // ============================================
        // CONFIGURAR ENDPOINT AQUI
        // Substitua 'ZZZ' pelo URL do seu endpoint
        // Exemplo: 'https://webhook.site/110bef40-429e-4ec0-9eb6-217c939aaf3a'
        // ============================================
        const endpoint = 'https://webhook.site/c2eda4bb-95ab-4e5e-9492-3894e582521c';

        // Se endpoint não configurado, retorna sem enviar
        if (endpoint === 'ZZZ' || !endpoint || endpoint.trim() === '') {
            console.log('Endpoint não configurado. Dados que seriam enviados:', dataToSubmit);
            return {
                success: true,
                data: dataToSubmit,
                validation: validation,
                message: 'Endpoint não configurado'
            };
        }

        // Validar que há dados para enviar
        if (!dataToSubmit || Object.keys(dataToSubmit).length === 0) {
            console.error('Nenhum dado para enviar!');
            throw new Error('Nenhum dado coletado para envio');
        }

        // Serializar dados para JSON
        const jsonBody = JSON.stringify(dataToSubmit);

        // Validar que o JSON foi criado corretamente
        if (!jsonBody || jsonBody === '{}' || jsonBody === 'null') {
            console.error('Erro ao serializar dados:', dataToSubmit);
            throw new Error('Erro ao serializar dados para JSON');
        }

        // Log para debug (remover em produção)
        console.log('=== ENVIO DE DADOS ===');
        console.log('Endpoint:', endpoint);
        console.log('Método: POST');
        console.log('Body (JSON):', jsonBody);
        console.log('Tamanho do body:', jsonBody.length, 'bytes');
        console.log('Dados originais:', dataToSubmit);

        // Enviar dados ao endpoint
        //
        // Regra prática:
        // - Se você estiver abrindo via `file://` (origin "null") OU usando `webhook.site`,
        //   usamos `no-cors` + `text/plain` para evitar preflight e conseguir testar rápido.
        // - Em host (https) e endpoint real (seu backend), usamos `cors` + `application/json`
        //   (desde que o servidor permita CORS). Assim você consegue ler status/response.
        const isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
        const isWebhookSite = typeof endpoint === 'string' && endpoint.includes('webhook.site');
        const shouldUseNoCors = isFileProtocol || isWebhookSite;

        if (shouldUseNoCors) {
            // Obs: em `no-cors` a resposta vira "opaque" (não dá pra ler status/body).
            const noCorsOptions = {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'omit',
                cache: 'no-cache',
                keepalive: true,
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8'
                },
                body: jsonBody
            };

            console.log('Opções do fetch (no-cors):', {
                method: noCorsOptions.method,
                mode: noCorsOptions.mode,
                headers: noCorsOptions.headers,
                bodyLength: noCorsOptions.body.length,
                bodyPreview: noCorsOptions.body.substring(0, 200) + '...'
            });

            const response = await fetch(endpoint, noCorsOptions);

            console.log('Resposta (no-cors):', {
                type: response.type,
                status: response.status,
                ok: response.ok
            });

            return {
                success: true,
                data: dataToSubmit,
                response: { type: response.type, status: response.status },
                validation: validation,
                message: 'Envio disparado (no-cors). Confira o destino (ex: webhook.site) para ver o body.'
            };
        }

        // Envio padrão (recomendado em produção)
        const corsOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            body: jsonBody
        };

        console.log('Opções do fetch (cors):', {
            method: corsOptions.method,
            mode: corsOptions.mode,
            headers: corsOptions.headers,
            bodyLength: corsOptions.body.length,
            bodyPreview: corsOptions.body.substring(0, 200) + '...'
        });

        const response = await fetch(endpoint, corsOptions);

        console.log('Status da resposta:', response.status);
        console.log('Headers da resposta:', [...response.headers.entries()]);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', errorText);
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }

        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            const textResult = await response.text();
            result = { message: textResult || 'Dados recebidos com sucesso' };
        }

        console.log('Resposta do servidor:', result);

        return {
            success: true,
            data: dataToSubmit,
            response: result,
            validation: validation,
            message: 'Dados enviados com sucesso (cors)'
        };

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        console.error('Stack trace:', error.stack);
        return {
            success: false,
            error: error.message,
            message: 'Erro ao processar dados',
            data: dataToSubmit || null
        };
    }
}

// Mostra resultados finais
function showResults() {
    const { score, classificacao, criticalFlags, warningFlags } = calculateResults();

    let scoreClass, scoreIcon, classificacaoText, messagesArray;
    if (score <= 8) {
        scoreClass = 'low';
        scoreIcon = 'mdi-alert-circle';
        classificacaoText = 'Operação altamente vulnerável';
        messagesArray = messagesLow;
    } else if (score <= 16) {
        scoreClass = 'medium';
        scoreIcon = 'mdi-trending-down';
        classificacaoText = 'Operação mediana com riscos moderados';
        messagesArray = messagesMedium;
    } else {
        scoreClass = 'high';
        scoreIcon = 'mdi-check-circle';
        classificacaoText = 'Operação sólida, mas com espaço para evolução';
        messagesArray = messagesHigh;
    }

    const randomMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];
    const { min: receitaPerdidaMin, max: receitaPerdidaMax } = calculateLostRevenue(score, formData.faturamento);
    const randomPhrase = revenueLostPhrases[Math.floor(Math.random() * revenueLostPhrases.length)];
    const revenuePhrase = randomPhrase
        .replace('R$ X', `R$ ${receitaPerdidaMin.toLocaleString('pt-BR')}`)
        .replace('R$ Y', `R$ ${receitaPerdidaMax.toLocaleString('pt-BR')}`);
    const cta = getCTA(score, criticalFlags, warningFlags);

    const auditData = {
        ...formData,
        resultado: {
            score,
            classificacao,
            receitaPerdidaMin,
            receitaPerdidaMax,
            criticalFlags,
            warningFlags
        },
        timestamp: new Date().toISOString()
    };

    try {
        localStorage.setItem('audit_' + formData.telefone, JSON.stringify(auditData));
    } catch (e) {
        // LocalStorage não disponível
    }

    // Enviar dados do formulário ao endpoint em segundo plano
    submitFormData().then((result) => {
        if (result && result.success) {
            console.log('✅ Dados enviados com sucesso:', result);
        } else {
            console.warn('⚠️ Envio de dados falhou:', result);
        }
    }).catch((error) => {
        // Log do erro para debug, mas não impacta a experiência do usuário
        console.error('❌ Erro ao enviar dados (não bloqueia o usuário):', error);
    });

    document.getElementById('audit-form').style.display = 'none';
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';

    const resultsWrapper = resultsSection.querySelector('.results-wrapper');
    resultsWrapper.style.opacity = '0';
    resultsWrapper.style.transform = 'translateY(20px)';

    resultsWrapper.innerHTML = `
        <div class="results-card">
            <div class="results-header">
                <div class="results-badge">
                    <i class="mdi mdi-chart-line"></i>
                    Auditoria Completa
                </div>
                <h1 class="results-title">${formData.nome}</h1>
                <p class="results-subtitle">Análise dos 7 pontos críticos da sua operação</p>
            </div>

            <div class="score-card ${scoreClass}">
                <div class="score-icon">
                    <i class="mdi ${scoreIcon}"></i>
                </div>
                <div class="score-number">${score}</div>
                <div class="score-label">Pontos de 24</div>
                <p class="score-classification">${classificacaoText}</p>
                <p class="score-message">${randomMessage}</p>
            </div>

            ${criticalFlags.length > 0 ? `
                <div class="issues-section critical-section">
                    <h3 class="issues-title critical-title">
                        <i class="mdi mdi-alert-circle"></i>
                        Problemas Críticos Encontrados
                    </h3>
                    <div class="issues-list">
                        ${criticalFlags.map(flag => `
                            <div class="issue-card critical">
                                <div class="issue-icon-wrapper">
                                    <i class="mdi mdi-trending-up"></i>
                                </div>
                                <div class="issue-content">
                                    <h4 class="issue-title">${flag.title || flag.description}</h4>
                                    ${flag.detail ? `<p class="issue-description">${flag.detail}</p>` : ''}
                                    ${flag.impactMin && flag.impactMax ? `
                                    <div class="issue-impact critical">
                                            <i class="mdi mdi-camera"></i>
                                            <span>${flag.impactLabel}: R$ ${flag.impactMin.toLocaleString('pt-BR')} a R$ ${flag.impactMax.toLocaleString('pt-BR')}/mês</span>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${warningFlags.length > 0 ? `
                <div class="issues-section warning-section">
                    <h3 class="issues-title warning-title">
                        <i class="mdi mdi-alert"></i>
                        Pontos de Atenção
                    </h3>
                    <div class="issues-list">
                        ${warningFlags.map(flag => `
                            <div class="issue-card warning">
                                <div class="issue-icon-wrapper">
                                    <i class="mdi mdi-alert"></i>
                                </div>
                                <div class="issue-content">
                                    <h4 class="issue-title">${flag.title || flag.description}</h4>
                                    ${flag.detail ? `<p class="issue-description">${flag.detail}</p>` : ''}
                                    ${flag.impactMin && flag.impactMax ? `
                                    <div class="issue-impact warning">
                                        <i class="mdi mdi-trending-up"></i>
                                            <span>${flag.impactLabel}: R$ ${flag.impactMin.toLocaleString('pt-BR')} a R$ ${flag.impactMax.toLocaleString('pt-BR')}/mês</span>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

                <div class="total-loss-card">
                    <div class="total-loss-icon">
                        <i class="mdi mdi-cash-multiple"></i>
                    </div>
                <h3 class="total-loss-title">Receita Perdida Estimada</h3>
                    <div class="total-loss-amount">
                    R$ ${receitaPerdidaMin.toLocaleString('pt-BR')} - R$ ${receitaPerdidaMax.toLocaleString('pt-BR')}
                    </div>
                <p class="total-loss-subtitle">${revenuePhrase}</p>
                </div>

            <div class="cta-card ${cta.urgency === 'high' ? 'cta-urgent' : ''}">
                <div class="cta-icon">
                    <i class="mdi ${cta.urgency === 'high' ? 'mdi-rocket' : 'mdi-whatsapp'}"></i>
                </div>
                <h3 class="cta-title">${cta.title}</h3>
                <p class="cta-text">${cta.description}</p>
                    <button class="btn-cta" onclick="handleWhatsApp()">
                    <span>${cta.buttonText}</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </button>
                    <p class="cta-footer">
                        <i class="mdi mdi-message-text"></i>
                    Converse com nosso time • Sem compromisso • Resultado em 10 minutos
                    </p>
                    </div>
        </div>
    `;

    setTimeout(() => {
        resultsWrapper.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        resultsWrapper.style.opacity = '1';
        resultsWrapper.style.transform = 'translateY(0)';
        const cards = resultsWrapper.querySelectorAll('.score-card, .issue-card, .total-loss-card, .cta-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }, 50);

    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// WhatsApp mensagem personalizada
function handleWhatsApp() {
    const { score, classificacao, criticalFlags, warningFlags } = calculateResults();
    const cta = getCTA(score, criticalFlags, warningFlags);
    const mainIssue = criticalFlags[0] || warningFlags[0];
    const phone = '5511945109907'; // número aqui!
    const lojaText = formData.prefereNaoDizer ? 'da minha loja' : (formData.nomeLoja && formData.nomeLoja.trim() ? `da loja ${formData.nomeLoja}` : 'da minha loja');

    let message = '';
    if (score <= 8) {
        message = encodeURIComponent(
            `Olá! Sou ${formData.nome} ${lojaText}.\n\n` +
            `Acabei de fazer o Diagnóstico de E-commerce e minha pontuação foi ${score}/24.\n\n` +
            `Identifiquei vários pontos críticos que precisam de atenção urgente.\n\n` +
            `Gostaria de conhecer a Unicodrop e ver como vocês podem me ajudar a transformar minha operação!`
        );
    } else if (formData.carrinhoAbandonado === 'nao') {
        message = encodeURIComponent(
            `Olá! Sou ${formData.nome} ${lojaText}.\n\n` +
            `Acabei de fazer o Diagnóstico de E-commerce e descobri que não recupero carrinhos abandonados.\n\n` +
            `Gostaria de conhecer a Unicodrop e ver como posso começar a recuperar carrinhos automaticamente!`
        );
    } else if (formData.recuperacao === 'nao') {
        message = encodeURIComponent(
            `Olá! Sou ${formData.nome} ${lojaText}.\n\n` +
            `Acabei de fazer o Diagnóstico de E-commerce e descobri que não recupero pedidos recusados.\n\n` +
            `Gostaria de conhecer a Unicodrop e ver como posso reduzir pedidos recusados automaticamente!`
        );
    } else if (score <= 16) {
        message = encodeURIComponent(
            `Olá! Sou ${formData.nome} ${lojaText}.\n\n` +
            `Acabei de fazer o Diagnóstico de E-commerce e minha pontuação foi ${score}/24.\n\n` +
            `Gostaria de conhecer a Unicodrop e ver como posso automatizar e escalar meus resultados!`
        );
    } else {
        message = encodeURIComponent(
            `Olá! Sou ${formData.nome} ${lojaText}.\n\n` +
            `Acabei de fazer o Diagnóstico de E-commerce e minha pontuação foi ${score}/24.\n\n` +
            `Gostaria de conhecer a Unicodrop e ver como posso levar minha operação ao próximo nível!`
        );
    }

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Inicialização ao carregar página
document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.selectOption = selectOption;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.handleWhatsApp = handleWhatsApp;
    window.scrollToForm = scrollToForm;

    // Renderizar a primeira pergunta ao carregar a página (sem foco para não fazer scroll)
    currentStep = 0;
    renderQuestion(false);
});

