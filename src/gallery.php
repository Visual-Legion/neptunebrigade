<?php /* Template Name: Gallery */ ?>

<?php //get_view_top(); 
    get_header();
    
    // $header = get_field('header','options'); 
    $allowed_tags_wysiwyg = wysiwygs_allowed_html();

?>

<?php //include('modules/gallery'); ?>

<section class="vl-gallery vl-gallery-partners ">

    <a href="/" class="button--transparent buton--back">Go Back</a>

    <div class="vl-gallery__header">
        <?php  if ($title = get_field('title')):  ?>
        <h1><?php echo wp_kses($title , $allowed_tags_wysiwyg); ?></h1>
        <?php endif; ?>
    </div>

    <?php 
            if( have_rows('image_groups') ): 
            $numSliders = count( get_field( 'image_groups' ) );
        ?>
    <div class="vl-gallery__sliders">
        <?php
            while ( have_rows('image_groups') ) : the_row();
            // print_r(get_field( 'image_groups' ));
            $images = get_sub_field('images');
            if( $images ):
                // print_r(get_field( 'images' ));
            $numSlides = count( $images );
        ?>

        <div class="vl-gallery__sliders__xtra-info">
            <h4> <span class="slide-index">01</span> | <span
                    class="tot-num-slides"><?php echo $numSlides  < 10 ? '0' . $numSlides : $numSlides ; ?></span>
            </h4>
        </div>

        <div class="vl-gallery__sliders__slider tab-section__content" id="slider-<?php echo get_row_index(); ?>">

            <?php 

            $imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
            $videoExts = array("mov", "wmv", "qt", "avi", "mp4", "webm");
            
             foreach( $images as $slider_image ): 

                $urlExt = pathinfo($slider_image['url'], PATHINFO_EXTENSION);

                if ($urlExt == 'mov'){
                    $urlExt = "mp4";
                }

                // $file_name_temp = explode(".", $file_name);
                // $urlExt = end($file_name_temp);

                // echo $slider_image['url'];
                // echo $urlExt;
                
                if (in_array($urlExt, $imgExts)) :

                $slider_image_medium_large = $slider_image['sizes']['medium_large'];
                // $slider_image_large = $slider_image['sizes']['large'];
                $slider_image_macbook = $slider_image['sizes']['macbook'];
                $slider_image_full_hd = $slider_image['sizes']['full_hd'];
            ?>
            <div class="vl-gallery__sliders__slider__slide">
                <picture>
                    <source data-srcset="<?php echo esc_url($slider_image_large); ?>" media="(max-width: 480px)">
                    <source data-srcset="<?php echo esc_url($slider_image_macbook); ?>" media="(max-width: 800px)">
                    <source data-srcset="<?php echo esc_url($slider_image_full_hd); ?>" media="(max-width: 1440px)">
                    <img class="vl-gallery__sliders__slider__slide-image lazyload"
                        data-src="<?php echo esc_url($slider_image['url']); ?>"
                        alt="<?php echo esc_attr($slider_image['alt']); ?>" />
                </picture>
            </div>
            <?php endif; ?>

            <?php if (in_array($urlExt, $videoExts)) : ?>
            <div class="vl-gallery__sliders__slider__slide">
                <video controls preload="none">
                    <source src="<?php echo esc_url($slider_image['url']); ?>" type="video/<?php echo $urlExt; ?>">
                </video>
            </div>

            <?php endif; ?>

            <?php endforeach;?>

        </div> <!-- /.vl-gallery__sliders__slider -->
        <?php endif; ?>



        <?php endwhile;?>

    </div> <!-- /."vl-gallery__sliders -->

    <div class="vl-gallery__sliders__footer tab-section__nav">
        <?php  while ( have_rows('image_groups') ) : the_row(); ?>
        <?php if ($title = get_sub_field('title')): ?>
        <a href="#slider-<?php echo get_row_index(); ?>" class="button button--tab">
            <?php echo wp_kses($title , $allowed_tags_wysiwyg); ?>
        </a>
        <?php endif; ?>
        <?php endwhile; ?>
    </div>

    <?php endif; ?>
</section>
</main>

<?php //get_footer(); ?>