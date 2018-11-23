<?php 

//Thanks wptuts

/**
 * Define our settings sections
 *
 * array key=$id, array value=$title in: add_settings_section( $id, $title, $callback, $page );
 * @return array
 */
function vl_options_page_sections() {
     
    $sections = array();
    // $sections[$id]       = __($title, 'vl_textdomain');
    // $sections['txt_section']    = __('Text Form Fields', 'vl_textdomain');
    // $sections['txtarea_section']    = __('Textarea Form Fields', 'vl_textdomain');
    // $sections['select_section']     = __('Select Form Fields', 'vl_textdomain');
    // $sections['checkbox_section']   = __('Checkbox Form Fields', 'vl_textdomain');

    $sections['header_section']    = __('Header Form Fields', 'vl_textdomain');
    $sections['footer_section']    = __('Footer Form Fields', 'vl_textdomain');
     
    return $sections;   
}

/**
 * Define our form fields (settings) 
 *
 * @return array
 */

// SO ATM HIDDEN IS FOR UPLAOD

function vl_options_page_fields() {
    // Text Form Fields section

		// $options[] = array(
		// 	"section" => "header_section",
		// 	"id" => VL_SHORTNAME . "_header_logo",
		// 	"title" => __( 'Header Logo', 'vl_textdomain' ),
		// 	"desc"    => __( 'Main logo to appear in header', 'vl_textdomain' ),
		// 	"type"    => "file",
		// );

		$options[] = array(
				"section" => "header_section",
				"id" 			=> VL_SHORTNAME . "_header_logo",
				"title" 	=> __( 'Header Logo', 'vl_textdomain' ),
				"desc"    => __( 'Main logo to appear in header', 'vl_textdomain' ),
				"type"    => "hidden",
				"class"		=> "default"
			);	

		$options[] = array(
				"section" => "footer_section",
				"id" 			=> VL_SHORTNAME . "_footer_logo",
				"title" 	=> __( 'Footer Logo', 'vl_textdomain' ),
				"desc"    => __( 'Secondary logo to appear in footer', 'vl_textdomain' ),
				"type"    => "hidden",
				"class"		=> "default"
			);	

    // $options[] = array(
    //     "section" => "footer_section",
    //     "id"      => VL_SHORTNAME . "_txt_input",
    //     "title"   => __( 'Text Input - Some HTML OK!', 'vl_textdomain' ),
    //     "desc"    => __( 'A regular text input field. Some inline HTML (<a>, <b>, <em>, <i>, <strong>) is allowed.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => __('Some default value','vl_textdomain')
    // );

    // $options[] = array(
    //     "section" => "footer_section",
    //     "id"      => VL_SHORTNAME . "_test_hidden_input",
    //     "title"   => __( 'Test Hidden Input - No HTML OK!', 'vl_textdomain' ),
    //     "desc"    => __( 'Testing Hidden Input', 'vl_textdomain' ),
    //     "type"    => "hidden",
    //     "std"     => __('Some default value','vl_textdomain')
    // );
     
    // $options[] = array(
    //     "section" => "txt_section",
    //     "id"      => VL_SHORTNAME . "_nohtml_txt_input",
    //     "title"   => __( 'No HTML!', 'vl_textdomain' ),
    //     "desc"    => __( 'A text input field where no html input is allowed.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => __('Some default value','vl_textdomain'),
    //     "class"   => "nohtml"
    // );
     
    // $options[] = array(
    //     "section" => "footer_section",
    //     "id"      => VL_SHORTNAME . "_numeric_txt_input",
    //     "title"   => __( 'Numeric Input', 'vl_textdomain' ),
    //     "desc"    => __( 'A text input field where only numeric input is allowed.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => "123",
    //     "class"   => "numeric"
    // );
      
    // $options[] = array(
    //     "section" => "txt_section",
    //     "id"      => VL_SHORTNAME . "_multinumeric_txt_input",
    //     "title"   => __( 'Multinumeric Input', 'vl_textdomain' ),
    //     "desc"    => __( 'A text input field where only multible numeric input (i.e. comma separated numeric values) is allowed.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => "123,234,345",
    //     "class"   => "multinumeric"
    // );
     
    // $options[] = array(
    //     "section" => "txt_section",
    //     "id"      => VL_SHORTNAME . "_url_txt_input",
    //     "title"   => __( 'URL Input', 'vl_textdomain' ),
    //     "desc"    => __( 'A text input field which can be used for urls.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => "http://wp.tutsplus.com",
    //     "class"   => "url"
    // );
     
    // $options[] = array(
    //     "section" => "txt_section",
    //     "id"      => VL_SHORTNAME . "_email_txt_input",
    //     "title"   => __( 'Email Input', 'vl_textdomain' ),
    //     "desc"    => __( 'A text input field which can be used for email input.', 'vl_textdomain' ),
    //     "type"    => "text",
    //     "std"     => "email@email.com",
    //     "class"   => "email"
    // );
     
    // $options[] = array(
    //     "section" => "txt_section",
    //     "id"      => VL_SHORTNAME . "_multi_txt_input",
    //     "title"   => __( 'Multi-Text Inputs', 'vl_textdomain' ),
    //     "desc"    => __( 'A group of text input fields', 'vl_textdomain' ),
    //     "type"    => "multi-text",
    //     "choices" => array( __('Text input 1','vl_textdomain') . "|txt_input1", __('Text input 2','vl_textdomain') . "|txt_input2", __('Text input 3','vl_textdomain') . "|txt_input3", __('Text input 4','vl_textdomain') . "|txt_input4"),
    //     "std"     => ""
    // );
     
    // // Textarea Form Fields section
    // $options[] = array(
    //     "section" => "txtarea_section",
    //     "id"      => VL_SHORTNAME . "_txtarea_input",
    //     "title"   => __( 'Textarea - HTML OK!', 'vl_textdomain' ),
    //     "desc"    => __( 'A textarea for a block of text. HTML tags allowed!', 'vl_textdomain' ),
    //     "type"    => "textarea",
    //     "std"     => __('Some default value','vl_textdomain')
    // );
 
    // $options[] = array(
    //     "section" => "txtarea_section",
    //     "id"      => VL_SHORTNAME . "_nohtml_txtarea_input",
    //     "title"   => __( 'No HTML!', 'vl_textdomain' ),
    //     "desc"    => __( 'A textarea for a block of text. No HTML!', 'vl_textdomain' ),
    //     "type"    => "textarea",
    //     "std"     => __('Some default value','vl_textdomain'),
    //     "class"   => "nohtml"
    // );
     
    // $options[] = array(
    //     "section" => "txtarea_section",
    //     "id"      => VL_SHORTNAME . "_allowlinebreaks_txtarea_input",
    //     "title"   => __( 'No HTML! Line breaks OK!', 'vl_textdomain' ),
    //     "desc"    => __( 'No HTML! Line breaks allowed!', 'vl_textdomain' ),
    //     "type"    => "textarea",
    //     "std"     => __('Some default value','vl_textdomain'),
    //     "class"   => "allowlinebreaks"
    // );
 
    // $options[] = array(
    //     "section" => "txtarea_section",
    //     "id"      => VL_SHORTNAME . "_inlinehtml_txtarea_input",
    //     "title"   => __( 'Some Inline HTML ONLY!', 'vl_textdomain' ),
    //     "desc"    => __( 'A textarea for a block of text. 
    //         Only some inline HTML 
    //         (<a>, <b>, <em>, <strong>, <abbr>, <acronym>, <blockquote>, <cite>, <code>, <del>, <q>, <strike>)  
    //         is allowed!', 'vl_textdomain' ),
    //     "type"    => "textarea",
    //     "std"     => __('Some default value','vl_textdomain'),
    //     "class"   => "inlinehtml"
    // );  
     
    // // Select Form Fields section
    // $options[] = array(
    //     "section" => "select_section",
    //     "id"      => VL_SHORTNAME . "_select_input",
    //     "title"   => __( 'Select (type one)', 'vl_textdomain' ),
    //     "desc"    => __( 'A regular select form field', 'vl_textdomain' ),
    //     "type"    => "select",
    //     "std"    => "3",
    //     "choices" => array( "1", "2", "3")
    // );
     
    // $options[] = array(
    //     "section" => "select_section",
    //     "id"      => VL_SHORTNAME . "_select2_input",
    //     "title"   => __( 'Select (type two)', 'vl_textdomain' ),
    //     "desc"    => __( 'A select field with a label for the option and a corresponding value.', 'vl_textdomain' ),
    //     "type"    => "select2",
    //     "std"    => "",
    //     "choices" => array( __('Option 1','vl_textdomain') . "|opt1", __('Option 2','vl_textdomain') . "|opt2", __('Option 3','vl_textdomain') . "|opt3", __('Option 4','vl_textdomain') . "|opt4")
    // );
     
    // // Checkbox Form Fields section
    // $options[] = array(
    //     "section" => "checkbox_section",
    //     "id"      => VL_SHORTNAME . "_checkbox_input",
    //     "title"   => __( 'Checkbox', 'vl_textdomain' ),
    //     "desc"    => __( 'Some Description', 'vl_textdomain' ),
    //     "type"    => "checkbox",
    //     "std"     => 1 // 0 for off
    // );
     
    // $options[] = array(
    //     "section" => "checkbox_section",
    //     "id"      => VL_SHORTNAME . "_multicheckbox_inputs",
    //     "title"   => __( 'Multi-Checkbox', 'vl_textdomain' ),
    //     "desc"    => __( 'Some Description', 'vl_textdomain' ),
    //     "type"    => "multi-checkbox",
    //     "std"     => '',
    //     "choices" => array( __('Checkbox 1','vl_textdomain') . "|chckbx1", __('Checkbox 2','vl_textdomain') . "|chckbx2", __('Checkbox 3','vl_textdomain') . "|chckbx3", __('Checkbox 4','vl_textdomain') . "|chckbx4")  
    // );
     
    return $options;    
}