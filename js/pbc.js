/* #D&D 5e Point-Buy Calculator
 ================================================== */
/*
 *  Version     1.2
 *  Author:     Sha Kong-Brooks
 *  Website:    http://shianra.com
 ================================================== */

var attrNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
var points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 9];
var modifiers = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

/**
 * @desc The racial stats.
 */
var racialStr = 0;
var racialDex = 0;
var racialCon = 0;
var racialInt = 0;
var racialWis = 0;
var racialCha = 0;

/**
 * @desc The table cells where the racial stats will be displayed.
 */
var racialStrTD = 'td#racialStr';
var racialDexTD = 'td#racialDex';
var racialConTD = 'td#racialCon';
var racialIntTD = 'td#racialInt';
var racialWisTD = 'td#racialWis';
var racialChaTD = 'td#racialCha';

/**
 * @desc The header for the racial traits section.
 */
var racialTraitsHeader = '<h3>Racial Traits</h3>';
var dlHorizontal = '<dl class="dl-horizontal clearfix">';
var dtColSm3 = '<dt class="col-xl-3">';
var dtEnd = '</dt>';
var ddColSm9 = '<dd class="col-xl-9">';
var ddEnd = '</dd>';
var dlEnd = '</dl>';

/**
 * @desc The table cells where the racial variant information will be displayed.
 */
var raceLabel = 'div#raceLabel';
var raceList = 'div#raceList';
var variantLabel = 'div#variantLabel';
var variantList = 'div#variantList';
var optionLabel1 = 'div#optionLabel1';
var optionChoice1 = 'div#optionChoice1';
var optionLabel2 = 'div#optionLabel2';
var optionChoice2 = 'div#optionChoice2';
var raceDescription = 'div#raceDescription';
var racialVariantInfo = 'div#racialVariant';

/**
 * 
 */
var totalStrTD = 'td#totalStr';
var totalDexTD = 'td#totalDex';
var totalConTD = 'td#totalCon';
var totalIntTD = 'td#totalInt';
var totalWisTD = 'td#totalWis';
var totalChaTD = 'td#totalCha';

/* -----------------------------------------------------
 All the cool stuff
 ----------------------------------------------------- */

/**
 * @func attrOptions
 * @returns {string}
 */
var attrOptions = function () {
    var options = '<option disabled selected>---</option>';
    attrNames.forEach(function (item) {
        options += '<option value="' + item + '">' + item + '</option>';
    });
    return options;
};

/**
 * @func getVariantAttrOptions
 * @param race
 */
var getVariantAttrOptions = function (race) {
    $(optionLabel1).html('<label for="option' + race +'1" class="col-form-label">' +
        'Ability Score #1:' +
        '</label>');
    $(optionChoice1).html('<select class="form-control" id="option' + race +'1"' + '">' +
        attrOptions() +
        '</select>');
    $(optionLabel2).html('<label for="option' + race +'2" class="col-form-label">' +
        'Ability Score #2:' +
        '</label>');
    $(optionChoice2).html('<select class="form-control" id="option' + race +'2"">' +
        attrOptions() +
        '</select>');
};

/**
 * @func getIntValue
 * @param source
 * @returns {Number}
 */
var getIntValue = function (source) {
    return parseInt($('input[id=' + source + ']').val())
};

/**
 * @func getRaceSelect
 * @returns {string}
 */
var getRaceSelect = function () {
    var optionDis = '<option value="---" disabled>-- ';
    var optionClo = '</option>';
    var raceSelect = '<select class="form-control" id="race" name="race" style="width: 100%;">' + optionDis + 'Player\'s Handbook' + optionClo;
    racialInfo.forEach(function (item) {
        raceSelect += '<option value=' + item.name + '>' + item.name + optionClo;
        switch(item.name) {
            case 'Tiefling':
                raceSelect += optionDis + 'Dungeon Master\'s Guide' + optionClo;
                break;
            case 'Eladrin':
                raceSelect += optionDis + 'Eberron Unearthed Arcana' + optionClo;
                break;
            case 'Warforged':
                raceSelect += optionDis + 'Elemental Evil Player\'s Guide' + optionClo;
                break;
            case 'Goliath':
                raceSelect += optionDis + 'Waterborne Adventures' + optionClo;
                break;
            case 'Minotaur':
                raceSelect += optionDis + 'Gothic Heroes' + optionClo;
                break;
        }
    });
    raceSelect += '</select>';
  return raceSelect;
};

/**
 * @func getRacialAttr
 */
var getRacialAttr = function(race) {
    var source1 = 'option' + race + '1';
    var bonusAttr1 = $('select[id=' + source1 + ']').val();
    increaseAttr(bonusAttr1, 1);

    var source2 = 'option' + race + '2';
    var bonusAttr2 = $('select[id=' + source2 + ']').val();
    increaseAttr(bonusAttr2, 1);

    getTotals();
};

/**
 * @func getRaceLabel
 * @returns {string}
 */
var getRaceLabel = function () {
    return '<label for="race" class="col-form-label">Select Race:</label>';
};

/**
 * @func getVariantLabel
 * @param race
 * @returns {string}
 */
var getVariantLabel = function (race) {
    return '<label for="race' + race.name + '" class="col-form-label">' + race.name + ' Subrace:</label>';
};

/**
 * @func getVariantSelect
 * @param race
 * @returns {string}
 */
var getVariantSelect = function (race) {
    var select = '<select class="form-control" id="raceVariant" style="width: 100%;">' +
        '<option disabled selected="">---</option>';

    race.variants.forEach(function (item) {
        select += '<option value="' + item.name + '">' + item.name + '</option>';
    });

    select += '</select>';
    return select;
};

/**
 * @func increaseAttr
 * @param attr
 * @param amount
 */
var increaseAttr = function (attr, amount) {
    switch (attr) {
        case 'Strength':
            racialStr = amount;
            $(racialStrTD).html(racialStr);
            break;
        case 'Dexterity':
            racialDex = amount;
            $(racialDexTD).html(racialDex);
            break;
        case 'Constitution':
            racialCon = amount;
            $(racialConTD).html(racialCon);
            break;
        case 'Intelligence':
            racialInt = amount;
            $(racialIntTD).html(racialInt);
            break;
        case 'Wisdom':
            racialWis = amount;
            $(racialWisTD).html(racialWis);
            break;
        case 'Charisma':
            racialCha = amount;
            $(racialChaTD).html(racialCha);
            break;
    }
};

/**
 * @func racialOther
 * @param array
 * @returns {string}
 */
var racialOther = function (array) {
    var data = '';
    array.forEach(function (item, index) {
        if (index % 2 == 0) {
            data += dtColSm3 + item + dtEnd;
        }
        else {
            data += ddColSm9 + item + ddEnd;
        }
    });
    return data;
};

/**
 * @func racialTemplate
 * @param race
 * @returns {string}
 */
var racialTemplate = function (race) {
    var other = racialOther(race.other);

    return racialTraitsHeader +
        dlHorizontal +
        dtColSm3 + 'Ability Score Modifiers' + dtEnd + ddColSm9 + race.ability + ddEnd +
        dtColSm3 + 'Age' + dtEnd + ddColSm9 + race.age + ddEnd +
        dtColSm3 + 'Alignment' + dtEnd + ddColSm9 + race.alignment + ddEnd +
        dtColSm3 + 'Size' + dtEnd + ddColSm9 + race.size + ddEnd +
        dtColSm3 + 'Speed' + dtEnd + ddColSm9 + race.speed + ddEnd +
        dtColSm3 + 'Language' + dtEnd + ddColSm9 + race.language + ddEnd +
        other +
        dlEnd;
};

/**
 * @func racialVariantTemplate
 * @param variant
 * @returns {string}
 */
var racialVariantTemplate = function (variant) {
    var racialVariantsHeader = '<h4>Variant Traits</h4>';
    var variantNote = '<p>Any trait shown below that conflicts with one above will override the above.</p>';

    var other = racialOther(variant.other);

    return racialVariantsHeader +
        variantNote +
        dlHorizontal +
        dtColSm3 + 'Ability Score Modifiers' + dtEnd + ddColSm9 + variant.ability + ddEnd +
        other +
        dlEnd;
};

/**
 * @func resetRacialAbilityScores
 */
var resetRacialAbilityScores = function () {
    racialStr = 0;
    racialDex = 0;
    racialCon = 0;
    racialInt = 0;
    racialWis = 0;
    racialCha = 0;

    $(racialStrTD).html(racialStr);
    $(racialDexTD).html(racialDex);
    $(racialConTD).html(racialCon);
    $(racialIntTD).html(racialInt);
    $(racialWisTD).html(racialWis);
    $(racialChaTD).html(racialCha);
};

/**
 * @func resetRacialOptions
 */
var resetRacialOptions = function () {
    $(variantLabel).html('');
    $(variantList).html('');
    $(optionLabel1).html('');
    $(optionChoice1).html('');
    $(optionLabel2).html('');
    $(optionChoice2).html('');
    $(raceDescription).html(racialTraitsHeader + '');
    $(racialVariantInfo).html('');
};

/**
 * @func setIntValue
 */
var setIntValue = function (target, amount) {
    $('input[id=' + target + ']').val(amount)
};

/* -----------------------------------------------------
 The big, meaty functions
 ----------------------------------------------------- */

/**
 * @func getRace
 */
var getRace = function() {
    var theRace = $('select[id=race]').val();

    resetRacialAbilityScores();
    resetRacialOptions();

    switch (theRace) {
        case 'Dragonborn':
            // +2 Str, +1 Cha
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            $(raceDescription).html(racialTemplate(racialInfo[0]));
            break;

        case 'Dwarf':
            // +2 Con
            racialCon = 2;
            $(racialConTD).html(racialCon);

            $(variantLabel).html(getVariantLabel(racialInfo[1]));
            $(variantList).html(getVariantSelect(racialInfo[1]));
            $(raceDescription).html(racialTemplate(racialInfo[1]));
            break;

        case 'Elf':
            // +2 Dex
            racialDex = 2;
            $(racialDexTD).html(racialDex);

            $(variantLabel).html(getVariantLabel(racialInfo[2]));
            $(variantList).html(getVariantSelect(racialInfo[2]));
            $(raceDescription).html(racialTemplate(racialInfo[2]));
            break;

        case 'Gnome':
            // +2 Int
            racialInt = 2;
            $(racialIntTD).html(racialInt);

            $(variantLabel).html(getVariantLabel(racialInfo[3]));
            $(variantList).html(getVariantSelect(racialInfo[3]));
            $(raceDescription).html(racialTemplate(racialInfo[3]));
            break;

        case 'Half-Elf':
            // +2 Cha, +1 to two others of choice
            racialCha = 2;
            $(racialChaTD).html(racialCha);

            var currentRace = 'HalfElf';

            getVariantAttrOptions(currentRace);

            var inputVariantHalfElf1 = document.getElementById('option' + currentRace + '1');
            var inputVariantHalfElf2 = document.getElementById('option' + currentRace + '2');

            inputVariantHalfElf1.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            inputVariantHalfElf2.addEventListener('change', function() { getRacialAttr(currentRace) }, false);

            $(raceDescription).html(racialTemplate(racialInfo[4]));
            break;

        case 'Half-Orc':
            // +2 Str, +1 Con
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialCon = 1;
            $(racialConTD).html(racialCon);

            $(raceDescription).html(racialTemplate(racialInfo[5]));
            break;

        case 'Halfling':
            // +2 Dex
            racialDex = 2;
            $(racialDexTD).html(racialDex);

            $(variantLabel).html(getVariantLabel(racialInfo[6]));
            $(variantList).html(getVariantSelect(racialInfo[6]));
            $(raceDescription).html(racialTemplate(racialInfo[6]));
            break;

        case 'Human':
            // +1 All
            racialStr = 1;
            $(racialStrTD).html(racialStr);
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            $(variantLabel).html(getVariantLabel(racialInfo[7]));
            $(variantList).html(getVariantSelect(racialInfo[7]));
            $(raceDescription).html(racialTemplate(racialInfo[7]));
            break;

        case 'Tiefling':
            // +1 Int, +2 Cha
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialCha = 2;
            $(racialChaTD).html(racialCha);

            $(raceDescription).html(racialTemplate(racialInfo[8]));
            break;
    }

    var inputVariant = document.getElementById('raceVariant');
    inputVariant.addEventListener('change', getVariant, false);

    getTotals();
};

/**
 *
 */
var getVariant = function () {
    var theRace = $('select[id=race]').val();

    switch (theRace) {

        case 'Dwarf':
            racialDwarf();
            break;

        case 'Elf':
            racialElf();
            break;

        case 'Gnome':
            racialGnome();
            break;

        case 'Half-Elf':
            racialHalfElf();
            break;

        case 'Halfling':
            racialHalfling();
            break;

        case 'Human':
            racialHuman();
            break;
    }
};

/**
 * @func racialDwarf
 */
var racialDwarf = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Hill Dwarf':
            racialStr = 0;
            $(racialStrTD).html(racialStr);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[1].variants[0]));
            break;

        case 'Mountain Dwarf':
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[1].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialElf
 */
var racialElf = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Dark Elf (Drow)':
            racialInt = 0;
            $(racialIntTD).html(racialInt);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[0]));
            break;

        case 'High Elf':
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[1]));
            break;

        case 'Wood Elf':
            racialInt = 0;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[2]));
            break;
    }

    getTotals();
};

/**
 * @func racialGnome
 */
var racialGnome = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Forest Gnome':
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 0;
            $(racialConTD).html(racialCon);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[3].variants[0]));
            break;

        case 'Rock Gnome':
            racialDex = 0;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[3].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialHalfElf
 */
var racialHalfElf = function() {
    var source1 = 'optionHalfElf1';
    var bonusAttr1 = $('select[id=' + source1 + ']').val();
    increaseAttr(bonusAttr1, 1);

    var source2 = 'optionHalfElf2';
    var bonusAttr2 = $('select[id=' + source2 + ']').val();
    increaseAttr(bonusAttr2, 1);

    getTotals();
};

/**
 * @func racialHalfling
 */
var racialHalfling = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Lightfoot Halfling':
            racialCon = 0;
            $(racialConTD).html(racialCon);
            racialCha = 1;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[6].variants[0]));
            break;

        case 'Stout Halfling':
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[6].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialHuman
 */
var racialHuman = function() {
    var variantState = $('select[id=raceVariant]').val();

    switch (variantState) {
        case 'Enabled':
            resetRacialAbilityScores();

            var currentRace = 'Human';

            getVariantAttrOptions(currentRace);

            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[7].variants[1]));

            var inputVariantHuman1 = document.getElementById('option' + currentRace + '1');
            var inputVariantHuman2 = document.getElementById('option' + currentRace + '2');

            inputVariantHuman1.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            inputVariantHuman2.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            break;

        case 'Disabled':
            racialStr = 1;
            $(racialStrTD).html(racialStr);
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            resetRacialOptions();

            $(variantLabel).html(getVariantLabel(racialInfo[7]));
            $(variantList).html(getVariantSelect(racialInfo[7]));
            $(raceDescription).html(racialTemplate(racialInfo[7]));
            break;
    }

    getTotals();
};

/**
 * @func getTotals
 */
var getTotals = function() {
    /**
     * @func getAttrTotal
     */
    var getAttrTotal = function () {
        $(totalStrTD).html(totalStr);
        $(totalDexTD).html(totalDex);
        $(totalConTD).html(totalCon);
        $(totalIntTD).html(totalInt);
        $(totalWisTD).html(totalWis);
        $(totalChaTD).html(totalCha);
    };

    /**
     * @func getCostAttr
     */
    var getCostAttr = function () {
        $('td#costStr').html(costStr);
        $('td#costDex').html(costDex);
        $('td#costCon').html(costCon);
        $('td#costInt').html(costInt);
        $('td#costWis').html(costWis);
        $('td#costCha').html(costCha);
    };

    /**
     * @func getCostTotal
     */
    var getCostTotal = function () {
        var costTotal = costStr + costDex + costCon + costInt + costWis + costCha;
        $('td#costTotal').html(costTotal);
    };

    /**
     * @func getMod
     */
    var getMod = function () {
        var modStr = modifiers[totalStr];
        var modDex = modifiers[totalDex];
        var modCon = modifiers[totalCon];
        var modInt = modifiers[totalInt];
        var modWis = modifiers[totalWis];
        var modCha = modifiers[totalCha];

        $('td#modStr').html(modStr);
        $('td#modDex').html(modDex);
        $('td#modCon').html(modCon);
        $('td#modInt').html(modInt);
        $('td#modWis').html(modWis);
        $('td#modCha').html(modCha);
    };

    var attrStr = getIntValue('attrStr');
    var attrDex = getIntValue('attrDex');
    var attrCon = getIntValue('attrCon');
    var attrInt = getIntValue('attrInt');
    var attrWis = getIntValue('attrWis');
    var attrCha = getIntValue('attrCha');

    var costStr = points[attrStr];
    var costDex = points[attrDex];
    var costCon = points[attrCon];
    var costInt = points[attrInt];
    var costWis = points[attrWis];
    var costCha = points[attrCha];

    var totalStr = attrStr + racialStr;
    var totalDex = attrDex + racialDex;
    var totalCon = attrCon + racialCon;
    var totalInt = attrInt + racialInt;
    var totalWis = attrWis + racialWis;
    var totalCha = attrCha + racialCha;

    getAttrTotal();
    getCostAttr();
    getCostTotal();
    getMod();
};

/**
 * @func resetAll
 */
var resetAll = function() {
    $(raceList).html(getRaceSelect());

    var inputRace = document.getElementById('race');
    inputRace.addEventListener('change', getRace, false);

    var baseNo = 8;
    var zeroValue = 0;

    setIntValue('attrStr', baseNo);
    setIntValue('attrDex', baseNo);
    setIntValue('attrCon', baseNo);
    setIntValue('attrInt', baseNo);
    setIntValue('attrWis', baseNo);
    setIntValue('attrCha', baseNo);

    $('td#costStr').html(zeroValue);
    $('td#costDex').html(zeroValue);
    $('td#costCon').html(zeroValue);
    $('td#costInt').html(zeroValue);
    $('td#costWis').html(zeroValue);
    $('td#costCha').html(zeroValue);

    resetRacialAbilityScores();

    $(totalStrTD).html(baseNo);
    $(totalDexTD).html(baseNo);
    $(totalConTD).html(baseNo);
    $(totalIntTD).html(baseNo);
    $(totalWisTD).html(baseNo);
    $(totalChaTD).html(baseNo);

    $('td#modStr').html(modifiers[baseNo]);
    $('td#modDex').html(modifiers[baseNo]);
    $('td#modCon').html(modifiers[baseNo]);
    $('td#modInt').html(modifiers[baseNo]);
    $('td#modWis').html(modifiers[baseNo]);
    $('td#modCha').html(modifiers[baseNo]);

    $('td#costTotal').html(zeroValue);

    resetRacialOptions();
    getTotals();
};

$(function () {
    $(raceLabel).html(getRaceLabel());
    $(raceList).html(getRaceSelect());

    var inputRace = document.getElementById('race');
    inputRace.addEventListener('change', getRace, false);

    var inputStr = document.getElementById('attrStr');
    var inputDex = document.getElementById('attrDex');
    var inputCon = document.getElementById('attrCon');
    var inputInt = document.getElementById('attrInt');
    var inputWis = document.getElementById('attrWis');
    var inputCha = document.getElementById('attrCha');

    inputStr.addEventListener('change', getTotals, false);
    inputDex.addEventListener('change', getTotals, false);
    inputCon.addEventListener('change', getTotals, false);
    inputInt.addEventListener('change', getTotals, false);
    inputWis.addEventListener('change', getTotals, false);
    inputCha.addEventListener('change', getTotals, false);

    var inputReset = document.getElementById('reset');
    inputReset.addEventListener('click', resetAll, false);
});